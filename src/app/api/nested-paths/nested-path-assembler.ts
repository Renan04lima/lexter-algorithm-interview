import { Input } from "@/data/input-default"

type Output = {
    entryId: number
    fullPath: string
    children: Output[]
    currentPath: string
}
export class NestedPathsAssembler {
    execute(inputList: Input[]): any[] {
        const output: Output[] = inputList
            .map(i => {
                return {
                    entryId: Number(i.entryId),
                    fullPath: i.path.join('/'),
                    currentPath: '',
                    children: []
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

    private isChildren(parent: Output, potentialChild: Output): boolean {
        return potentialChild.fullPath.startsWith(parent.fullPath + '/');
    }

    private addChildren(output: Output[]) {
        for (let i = 0; i < output.length; i++) {
            output[i].currentPath = output[i].fullPath.split('/').pop() || '';
            for (let j = i + 1; j < output.length; j++) {
                const isChildren = this.isChildren(output[i], output[j]);
                if (isChildren) {
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