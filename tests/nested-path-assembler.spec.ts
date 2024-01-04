import { Input } from "@/data/input-default"

class NestedPathsAssembler {
    execute(inputList: Input[]): any[] {
        type Output = {
            entryId: number
            path: string[]
            children: Output[]
        }
        const output: Output[] = inputList
            .map(i => ({
                entryId: Number(i.entryId),
                path: i.path,
                children: []
            }))
            .sort((a, b) => {
                if (a.entryId > b.entryId) {
                    return 1
                } else if (a.entryId < b.entryId) {
                    return -1
                } else {
                    return 0
                }

            })

        for (let i = 0; i < output.length; i++) {
            for (let j = i + 1; j < output.length; j++) {
                if (output[i].path.includes(output[j].path[0])) {
                    const copiedObject: Output = JSON.parse(JSON.stringify(output[j]));

                    output[i].children.push(copiedObject);

                    output.splice(j, 1);
                    j--;
                }
            }
        }

        return output
    }
}

describe('NestedPathsAssembler', () => {
    test('All output list levels must be in ascending order by entryId', () => {
        const sut = new NestedPathsAssembler()
        const input = [
            { entryId: "3", path: ["root3"] },
            { entryId: "1", path: ["root1"] },
            { entryId: "2", path: ["root2"] },
        ]
        const output = sut.execute(input)

        const a = output.map(o => o.entryId)
        console.log(a)
        console.log(output)
        expect(a).toEqual([
            1, 2, 3
        ])
    })

    test('An entry must be a child of another if the beginning of the path of both is the same, that is, the \'root/path\' entry is a child of the \'root\' entry', () => {
        const sut = new NestedPathsAssembler()
        const input = [
            { entryId: "1", path: ["root1"] },
            { entryId: "2", path: ["root1", "path2"] },
            { entryId: "3", path: ["root1", "path2", "path2"] },
        ]
        const output = sut.execute(input)

        expect(output).toEqual([
            {
                entryId: 1,
                path: ["root1"],
                children: [
                    {
                        children: [],
                        entryId: 2,
                        path: ["root1", "path2"],
                    },
                    {
                        children: [],
                        entryId: 3,
                        path: ["root1", "path2", "path2"],
                    },
                ],
            }
        ])
    })
    test.todo('The Output fullPath key is a string with all path elements separated by /')
    test.todo('The currentPath key is the current path value. In other words, for the fullPath entry roo/path, your currentPath is path')
})