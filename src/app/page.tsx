import { GithubButton } from './../components/github-button';
import { Wand2 } from "lucide-react"
import { Textarea, Separator, Button } from "@/components/ui";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">Nested Path Assembler</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Lexter.ai Interview Challenge</span>

          <Separator orientation="vertical" className="h-6" />

          <GithubButton />
        </div>
      </div>
      <main className="flex-1 flex p-6 gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <p className="text-sm text-muted-foreground">
            Coloque o input e clique em Executar para gerar o output.
          </p>
          <div className="grid grid-rows-2 gap-1 flex-1">
            <Textarea
              className="resize-none leading-relaxed p-4"
              placeholder="Input"
            />
            <Textarea
              className="resize-none leading-relaxed p-4"
              placeholder="Output"
              readOnly
            />
          </div>
        </div>

        <aside className="w-80 flex items-center">
          <Button disabled={false} type="submit" className="w-full">
            Execute
            <Wand2 className="h-4 w-4 ml-2" />
          </Button>
        </aside>
      </main>
    </div>
  )
}
