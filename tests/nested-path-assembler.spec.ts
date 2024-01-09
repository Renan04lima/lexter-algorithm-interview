import { NestedPathsAssembler } from "@/app/api/nested-paths/nested-path-assembler"

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
            { entryId: "1", path: ["root1"] },
            { entryId: "3", path: ["root1", "path2"] },
            { entryId: "2", path: ["root1", "path3", "path2"] },
            { entryId: "4", path: ["root2"] },
        ]
        const output = sut.execute(input)

        expect(output.map(o => o.fullPath)).toEqual([
            "root1",
            "root2",
        ])
    })

    test('An entry must be a child of another if the beginning of the path of both is the same, that is, the \'root/path\' entry is a child of the \'root\' entry', () => {
        const sut = new NestedPathsAssembler()
        const input = [
            { entryId: "1", path: ["root1"] },
            { entryId: "2", path: ["root1", "path2"] },
            { entryId: "3", path: ["root1", "path2", "path2"] },
            { entryId: "4", path: ["root1", "path3", "path2"] },
        ]
        const output = sut.execute(input)

        expect(output).toMatchObject([
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
                    {
                        entryId: 4,
                        fullPath: "root1/path3/path2",
                        children: [],
                    },
                ],
            }
        ])
    })

    test('The currentPath key is the current path value. In other words, for the fullPath entry roo/path, your currentPath is path', () => {
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
                currentPath: "root1",
                children: [
                    {
                        entryId: 2,
                        fullPath: "root1/path2",
                        currentPath: "path2",
                        children: [
                            {
                                entryId: 3,
                                currentPath: "path2",
                                fullPath: "root1/path2/path2",
                                children: [],
                            },
                        ],
                    },
                ],
            }
        ])
    })

    test('It should throw an error if missing a parent path', () => {
        const input = [
            { entryId: "1", path: ["root2"] },
            { entryId: "2", path: ["root1", "path2"] },
            { entryId: "3", path: ["root1", "path2", "path2"] },
        ]

        const sut = new NestedPathsAssembler()

        expect(() => sut.execute(input)).toThrow(new Error('Missing root path: root1'))
    })
})