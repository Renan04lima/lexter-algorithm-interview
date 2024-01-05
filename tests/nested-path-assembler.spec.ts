import { Input } from "@/data/input-default"

type Output = {
    entryId: number
    fullPath: string
    children: Output[]
}
class NestedPathsAssembler {
    execute(inputList: Input[]): any[] {
        const output: Output[] = inputList
            .map(i => {
                const [root, ...paths] = i.path;
                const fullPath = `${root}${paths.length > 0 ? `/${paths.sort().join('/')}` : ''}`;

                return {
                    entryId: Number(i.entryId),
                    fullPath,
                    children: [],
                }
            })
            .sort((a, b) => {
                if (a.entryId > b.entryId) {
                    return 1
                } else if (a.entryId < b.entryId) {
                    return -1
                } else {
                    return 0
                }

            })

        this.addChildren(output)

        return output
    }

    private addChildren(output: Output[]) {
        for (let i = 0; i < output.length; i++) {
            for (let j = i + 1; j < output.length; j++) {
                if (output[i].fullPath.split('/').includes(output[j].fullPath.split('/')[0])) {
                    const copiedObject: Output = JSON.parse(JSON.stringify(output[j]));

                    output[i].children.push(copiedObject);

                    output.splice(j, 1);
                    j--;
                }
            }
            if (output[i].children.length > 0) {
                this.addChildren(output[i].children)
            }
        }
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

        expect(output.map(o => o.entryId)).toEqual([
            1, 2, 3
        ])
    })

    test('The Output fullPath key is a string with all path elements separated by /', () => {
        const sut = new NestedPathsAssembler()
        const input = [
            { entryId: "3", path: ["root3", "path2"] },
            { entryId: "1", path: ["root1", "path3", "path2"] },
            { entryId: "2", path: ["root2", "path1"] },
        ]
        const output = sut.execute(input)

        expect(output.map(o => o.fullPath)).toEqual([
            "root1/path2/path3",
            "root2/path1",
            "root3/path2",
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

        expect(output).toStrictEqual([
            {
                entryId: 1,
                fullPath: "root1",
                children: [
                    {
                        entryId: 2,
                        fullPath: "root1/path2",
                        children: [
                            {
                                entryId: 3,
                                fullPath: "root1/path2/path2",
                                children: [],
                            },
                        ],
                    },
                ],
            }
        ])
    })
    test.todo('The currentPath key is the current path value. In other words, for the fullPath entry roo/path, your currentPath is path')
})