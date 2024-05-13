//Estilização da página de dashboard, lembre-se de configurar o jsx para react no tsconfig!
import React, { useEffect, useState } from "react"
import { H1, H2, Table, TableHead, TableRow, TableCell, TableBody } from "@adminjs/design-system"
import { ApiClient, useCurrentAdmin } from "adminjs"

export default function Dashboard() {
    const [resources, setResources] = useState<{ [key: string]: number }>() // resource tem várias chaves diferentes, sendo strings com valores numéricos
    const [currentAdmin] = useCurrentAdmin() // retorna na tela o nome do adminstrador que está logado

    const api = new ApiClient() // fazer a chamada de API

    useEffect(() => { // Executa efeitos colaterais na aplicação: chamadas de rede, atualizações do DOM etc
        fetchDashboardData()
    }, []) // deixa de chamar toda hora a api do backend

    async function fetchDashboardData() {
        const res = await api.getDashboard() // Pega as informações por API no backend handler e retorna para o front
        setResources(res.data) // setResource que pega o useState com a chave contendo string e valores. ex: Noticias: 10
    }

    return [
        <section style={{ padding: '1.5rem' }}>
            <H1>Seja bem-vindo(a), Administrador {currentAdmin?.firstName}</H1>

            <section style={{ backgroundColor: '#fff', padding: '1.5rem' }}>
                <H2>Resumo</H2>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#02012d' }}>
                            <TableCell style={{ color: '#fff' }}>Recurso</TableCell>
                            <TableCell style={{ color: '#fff' }}>Registros</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            resources ? // Se o recourses estiver setado retorna as entradas do objeto
                                Object.entries(resources).map(([resource, count]) => (
                                    // Cria uma linha para cada recurso retornado mostrando os registros renderizados na tela
                                    <TableRow key={resource}>
                                        <TableCell>{resource}</TableCell>
                                        <TableCell>{count}</TableCell>
                                    </TableRow>
                                ))
                                : // Se não tiver não há retorno
                                <></>
                        }
                    </TableBody>
                </Table>
            </section>
        </section>
    ]
}