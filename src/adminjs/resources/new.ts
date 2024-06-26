import {ResourceOptions } from "adminjs";
import { FeatureType } from "adminjs";
import uploadFileFeature from "@adminjs/upload";
import path from "path";

export const newsResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: ['name', 'textNews', 'gameId', 'order', 'uploadVideo', 'uploadImage','secondsLong'],
  filterProperties: ['name', 'textNews', 'gameId', 'secondsLong', 'createdAt', 'updatedAt'],
  listProperties: ['id', 'name', 'gameId', 'order', 'secondsLong'],
  showProperties: ['id', 'name', 'textNews', 'gameId', 'order', 'videoUrl', 'imageUrl' ,'secondsLong', 'createdAt', 'updatedAt']

  
}

// Podemos adicionar ferramentas de upload no nosso adminJS
// No caso definimos uma pasta que não seja publica, assim depedendo da regra um usuário pode acessar ou não o contúdo.
export const newsResourceFeaturesVideo: FeatureType[] = [
    uploadFileFeature({
        provider:{
            local: {
                bucket: path.join(__dirname, '..', '..', '..', 'uploads') // Não pode colocar na public os itens, pois precisa ser assinante para acessar os videos.
            }
        }, // definimos as propriedades para o upload
        properties: {
            key: 'videoUrl', // onde referenciamos do banco a url do video que estamos fazendo o upload
            file:'uploadVideo', // onde é feito o upload pelo formulário do painel
            filePath: 'videoFilePath',
            filesToDelete: 'videoFilesToDelete',
        },
        // temos como por o nome do arquivo e como ele será salvo na pasta 'uploads'. em uploadPath passamos o record que é o registro no bd onde é salvado o vídeo e filename o nome do arquivo upado
        uploadPath: (record, filename) => `videos/game-${record.get('gameId')}/${filename}` // todo video que subirmos vai ficar em um caminho como esse na pasta 'uploads'
        // todos os videos do mesmo curso vai ficar em uma mesma pasta ex: `videos/game-fifa20/noticia`
    }),
]

export const newsResourceFeaturesImage: FeatureType[] = [
    uploadFileFeature({
        provider: {
            local: {
                bucket: path.join(__dirname, '..', '..', '..', 'uploads')
            }
        },
        properties: {
            key: 'imageUrl',
            file: 'uploadImage',
            filePath: 'imageFilePath',
            filesToDelete: 'imageFilesToDelete',
        }, 
        uploadPath: (record, filename) => `images/game-${record.get('gameId')}/${filename}`
    }),
]

// temos o serviço de API e autenticação para fazer certos controles desse upload