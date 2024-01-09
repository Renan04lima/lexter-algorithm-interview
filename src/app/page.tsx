'use client'

import { useState } from 'react';
import { Textarea, Separator, Button } from "@/components/ui";
import { GithubButton } from '@/components/github-button';
import { Wand2 } from "lucide-react"
import { inputList } from '@/data/input-default';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [input, setInput] = useState<string>(JSON.stringify(inputList, null, 2))
  const [output, setOutput] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  function isValidJson(json: string) {
    try {
      JSON.parse(json)
      return true
    } catch (error) {
      return false
    }
  }

  async function handleExecute() {
    setLoading(true)
    try {
      if (!isValidJson(input)) {
        throw new Error('Invalid JSON')
      }
      const response = await fetch('/api/nested-paths', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: input
      })
      const { output: outputResponse } = await response.json()
      setOutput(JSON.stringify(outputResponse, null, 2))
    } catch (error) {
      toast.error((error as Error)?.message ?? 'Erro interno')
    } finally {
      setLoading(false)
    }
  }

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
      <main className="flex-1 flex flex-col p-6 gap-6 md:flex-row md:items-stretch">
        <div className="flex flex-col flex-1 gap-4">
          <p className="text-sm text-muted-foreground">
            Coloque o input e clique em Executar para gerar o output.
          </p>
          <div className="grid grid-rows-2 gap-1 flex-1">
            <Textarea
              className="resize-none leading-relaxed p-4"
              placeholder="Input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Textarea
              className="resize-none leading-relaxed p-4"
              placeholder="Output"
              readOnly
              value={output}
            />
          </div>
        </div>

        <aside className="w-full md:w-80 flex items-center mt-4 md:mt-0">
          <Button disabled={loading} type="submit" className="w-full" onClick={handleExecute}>
            Executar
            <Wand2 className="h-4 w-4 ml-2" />
          </Button>
        </aside>
      </main>
      <ToastContainer />
    </div>
  )
}
