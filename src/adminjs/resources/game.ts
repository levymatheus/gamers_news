//import uploadFileFeature from "@adminjs/upload";
import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";
//import path from "path";

export const gameResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: ['name', 'synopsis', 'uploadThumbnail', 'featured', 'categoryId'],
  filterProperties: ['name', 'synopsis', 'featured', 'categoryId', 'createdAt', 'updatedAt'],
  listProperties: ['id', 'name', 'featured', 'categoryId'],
  showProperties: ['id', 'name', 'synopsis', 'featured', 'thumbnailUrl', 'categoryId', 'createdAt', 'updatedAt']
}

export const gameResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        bucket: path.join(__dirname, '..', '..', '..', 'public') //a capa do jogo fica na pasta publica para que todos possam ver.
      }
    },
    properties: {
      key: 'thumbnailUrl', // chave que referencia a coluna no banco de dados
      file: 'uploadThumbnail' // input de upload no painel administrativo
    },
    uploadPath: (record, filename) => `thumbnails/game-${record.get('id')}/${filename}` // o caminho que serão salvos as capas na pasta public
  })
]