import S from '@sanity/desk-tool/structure-builder'
import { MdHome, MdQueueMusic } from 'react-icons/md'

export default () =>
  S.list()
    .title('Site')
    .items([
      S.listItem()
        .title('Homepage & Settings')
        .icon(MdHome)
        .child(
          S.editor()
            .id('homepage')
            .schemaType('homepage')
            .documentId('homepage')
        ),
      S.listItem()
        .id('tracks')
        .title('Tracks')
        .icon(MdQueueMusic)
        .child(S.documentTypeList('track')),
    ])
