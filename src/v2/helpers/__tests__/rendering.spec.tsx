import { wysiwygToHtml } from 'v2/helpers/rendering'

describe('wysiwygToHtml', () => {
  const draftString = JSON.stringify({
    blocks: [{ text: 'Foo', type: 'unstyled', entityRanges: [] }],
    entityMap: {}
  })

  it('returns html string', () => {
    expect(wysiwygToHtml(draftString)).toEqual(`<p>Foo</p>\n`)
  })
})
