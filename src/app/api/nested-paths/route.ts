import { NextResponse } from "next/server";
import { NestedPathsAssembler } from "./nested-path-assembler";
import { ApiError, InvalidFormatError, MissingRootPathError } from "./errors";

interface RequestBody {
    entryId: string;
    path: string[];
}

export async function POST(req: Request) {
    try {
        const body = await req.json()

        if (!validateRequestBody(body)) {
            throw new InvalidFormatError()
        }

        const np = new NestedPathsAssembler()
        const output = np.execute(body)

        return NextResponse.json({ output }, { status: 200 })
    } catch (err) {
        if (err instanceof ApiError) {
            return NextResponse.json({ message: err.message }, { status: 400 })
        } else if (err instanceof SyntaxError) {
            return NextResponse.json({ message: 'JSON no formato inválido.' }, { status: 400 })
        }

        return NextResponse.json({ message: 'Error interno do servidor.' }, { status: 500 })
    }
}

function validateRequestBody(body: any): body is RequestBody[] {
    if (!Array.isArray(body)) {
        return false;
    }

    for (const item of body) {
        if (
            !item ||
            typeof item.entryId !== 'string' ||
            !Array.isArray(item.path) ||
            item.path.some((pathItem: any) => typeof pathItem !== 'string')
        ) {
            return false;
        }
    }

    return true;
};
