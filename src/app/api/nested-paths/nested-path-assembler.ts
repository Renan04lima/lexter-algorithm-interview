import { Input } from "@/types/input"
import { Output } from "@/types/output"
import { MissingRootPathError } from "./errors"

export class NestedPathsAssembler {
    execute(inputList: Input[]): Output[] {
        const output: Output[] = inputList
            .map(i => {
                return {
                    entryId: Number(i.entryId),
                    fullPath: i.path.join('/'),
                    currentPath: '',
                    children: []
                }
            })
            .sort((a, b) => a.entryId - b.entryId)

        this.addChildren(output)

        output.forEach(item => {
            const rootPath = item.fullPath.split('/')[0];

            if (!output.some(otherItem => otherItem.fullPath === rootPath)) {
                throw new MissingRootPathError(rootPath);
            }
        });

        return output
    }

    private isChildren(parent: Output, potentialChild: Output): boolean {
        return potentialChild.fullPath.startsWith(parent.fullPath + '/')
    }

    private addChildren(output: Output[]) {
        for (let i = 0; i < output.length; i++) {
            output[i].currentPath = output[i].fullPath.split('/').pop() || '';
            
            for (let j = i + 1; j < output.length; j++) {
                if (this.isChildren(output[i], output[j])) {
                    const copiedObject: Output = JSON.parse(JSON.stringify(output[j]))

                    output[i].children.push(copiedObject)

                    output.splice(j, 1)
                    j--;
                }
            }

            if (output[i].children.length > 0) {
                this.addChildren(output[i].children)
            }
        }
    }
}