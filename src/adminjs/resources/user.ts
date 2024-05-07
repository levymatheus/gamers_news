import { ResourceOptions } from "adminjs"

export const userResourceOptions: ResourceOptions = {
    navigation: 'Administração', // Na aba de navegação adicionamos um recurso para administrar esses usuários
    properties: { // podemos se necessário manipular as propriedades que tem para setar dados dos usuários
        birth: { // exemplo, deixar apenas um input de data, não horas como padrão
            type: 'date' 
        },
        password: { // a senha do tipo password para poder ficar ******
            type: 'password'
        },
        role: { // Um input do tipo select para setar se o usuário tem permissão de admin ou de user
            availableValues: [
                { value: 'admin', label: 'Administrador' },
                { value: 'user', label: 'Usuário Padrão' }
            ]
        }
    },
    editProperties: [
        'firstName',
        'lastName',
        'phone',
        'birth',
        'email',
        'password',
        'role'
    ],
    filterProperties: [
        'firstName',
        'lastName',
        'phone',
        'birth',
        'role',
        'createdAt',
        'updatedAt' 
    ],
    listProperties: [
        'id',
        'firstName',
        'email',
        'role'
    ], 
    showProperties: [
        'id',
        'firstName',
        'lastName',
        'phone',
        'birth',
        'email',
        'role',
        'createdAt',
        'updatedAt'
    ]
}