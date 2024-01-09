import { NextResponse } from "next/server";
import { NestedPathsAssembler } from "./nested-path-assembler";
import { MissingRootPathError } from "./errors";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const np = new NestedPathsAssembler()
        const output = np.execute(body)

        return NextResponse.json({ output }, { status: 200 })
    } catch (err) {
        if (err instanceof MissingRootPathError) {
            return NextResponse.json({ message: err.message }, { status: 400 })
        }
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}
