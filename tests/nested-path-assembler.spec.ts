import { NestedPathsAssembler } from "@/app/api/nested-paths/nested-path-assembler"

describe('NestedPathsAssembler', () => {
    let sut: NestedPathsAssembler

    beforeEach(() => {
        sut = new NestedPathsAssembler()
    })

    test('All output list levels must be in ascending order by entryId', () => {
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

    test('An entry must be a child of another if the beginning of the path of both is the same, that is, the \'root/path\' entry is a child of the \'root\' entry', () => {
        const input = [
            { entryId: "1", path: ["root1"] },
            { entryId: "5", path: ["root2"] },
            { entryId: "2", path: ["root1", "path2"] },
            { entryId: "3", path: ["root1", "path2", "path2"] },
            { entryId: "4", path: ["root1", "path3", "path2"] },
            { entryId: "6", path: ["root2", "path1"] },
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
                                fullPath: "root1/path2/path2",
                                currentPath: "path2",
                                children: [],
                            },
                        ],
                    },
                    {
                        entryId: 4,
                        fullPath: "root1/path3/path2",
                        currentPath: "path2",
                        children: [],
                    },
                ],
            },
            {
                entryId: 5,
                fullPath: "root2",
                currentPath: "root2",
                children: [
                    {
                        entryId: 6,
                        fullPath: "root2/path1",
                        currentPath: "path1",
                        children: [],
                    },
                ],
            },
        ])
    })

    test('It should throw an error if missing a parent path', () => {
        const input = [
            { entryId: "1", path: ["root2"] },
            { entryId: "2", path: ["root1", "path2"] },
            { entryId: "3", path: ["root1", "path2", "path2"] },
        ]

        expect(() => sut.execute(input)).toThrow(new Error('Missing root path: root1'))
    })
})