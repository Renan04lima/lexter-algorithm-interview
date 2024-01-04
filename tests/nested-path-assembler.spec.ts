import { Input } from "@/data/input-default"

class NestedPathsAssembler {
    execute(inputList: Input[]): any[] {
        const output = inputList
            .map(i => ({ entryId: Number(i.entryId) }))
            .sort((a, b) => {
                if (a.entryId > b.entryId) {
                    return 1
                } else if (a.entryId < b.entryId) {
                    return -1
                } else {
                    return 0
                }

            })

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

        expect(output.map(o => o.entryId)).toEqual([
            1, 2, 3
        ])
    })

    test.todo('An entry must be a child of another if the beginning of the path of both is the same, that is, the \'root/path\' entry is a child of the \'root\' entry')
    test.todo('The Output fullPath key is a string with all path elements separated by /')
    test.todo('The currentPath key is the current path value. In other words, for the fullPath entry roo/path, your currentPath is path')
})