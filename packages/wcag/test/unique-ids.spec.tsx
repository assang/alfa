import test from 'ava'

import { check } from '@alfa/rule'
import { Element, find, findAll } from '@alfa/dom'

import { UNIQUE_IDS } from '../src/unique-ids/rule'
import { outcome } from './helpers/outcome'

test('Passes when no duplicate IDs exist within a document', async t => {
  const document: Element = (
    <div id='foo'>
      <div id='bar'></div>
    </div>
  )

  const results = await check(UNIQUE_IDS, { document })

  const foo = find(document, '#foo')
  const bar = find(document, '#bar')

  outcome(t, results, { passed: [foo, bar] })
})

test('Fails when elements with duplicate IDs exist within a document', async t => {
  const document: Element = (
    <div id='foo'>
      <div id='foo'></div>
    </div>
  )

  const results = await check(UNIQUE_IDS, { document })

  const foos = findAll(document, '#foo')

  outcome(t, results, { failed: [...foos] })
})

test('Marks the document as inapplicable when no elements with IDs exist', async t => {
  const document: Element = (
    <div>
      foo
      <div>bar</div>
    </div>
  )

  const results = await check(UNIQUE_IDS, { document })

  outcome(t, results, { inapplicable: [document] })
})
