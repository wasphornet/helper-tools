import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ReactHtmlParser from 'react-html-parser'

const TermsAndConditionsPreviewStyle = styled.div`
  body #tc-list-section,
  body #tc-table-section,
  body #tc-warning-section {
    font-size: 0.9em;
    color: #002d63;
  }

  p,
  span {
    margin: 0;
  }

  p.tc-title {
    font-weight: 700;
    text-align: center;
  }

  .tc-text-bold {
    font-weight: 700;
  }

  .tc-text-left {
    text-align: left;
  }

  .tc-text-underline {
    text-decoration: underline;
  }

  .tc-w-100 {
    width: 100%;
  }

  .tc-w-40 {
    width: 40%;
  }

  .tc-w-auto {
    width: auto;
  }

  ol.tc-list,
  ol.tc-table-list {
    list-style-type: none;
  }

  ol.tc-table-list,
  ul.tc-disc-list {
    margin-block-start: 0;
    margin-block-end: 0;
  }

  ul.tc-disc-list {
    list-style-type: disc;
    padding-inline-start: 1.75em;
  }

  ol.tc-list.first-level-list,
  ol.tc-table-list {
    padding-inline-start: 0;
  }

  ol.tc-list.second-level-list {
    padding-inline-start: 2em;
  }

  ol.tc-list > li > p:last-child,
  ol.tc-table-list > li > p:last-child,
  ul.tc-disc-list > li > p:last-child,
  ol.tc-list > p:last-child {
    padding-bottom: 0.5em;
  }

  ol.tc-list > li > p,
  ol.tc-table-list > li > p {
    padding-left: 0.75em;
  }

  ul.tc-disc-list > li > p {
    padding-left: 0.25em;
  }

  ol.tc-list > li,
  ol.tc-table-list > li {
    display: table-row;
  }

  ol.tc-list > li:before {
    text-align: left;
  }

  ol.tc-list > li:before,
  ol.tc-table-list > li:before {
    display: table-cell;
  }

  ol.first-level-list:first-child {
    counter-reset: first-level-counter 0;
  }

  ol.first-level-list > li {
    counter-increment: first-level-counter;
  }

  ol.first-level-list > li:before {
    content: counter(first-level-counter) '.';
  }

  ol.second-level-list.no-list {
    margin-left: -2.75em;
    text-indent: 2.75em;
  }
  ol.second-level-list:first-child {
    counter-reset: second-level-counter 0;
  }

  ol.second-level-list > li {
    counter-increment: second-level-counter;
  }

  ol.second-level-list > li:before {
    content: counter(first-level-counter) '.' counter(second-level-counter);
  }

  ol.tc-table-list:first-child {
    counter-reset: table-list-counter 0;
  }

  ol.tc-table-list > li {
    counter-increment: table-list-counter;
  }

  ol.tc-table-list > li:before {
    content: counter(table-list-counter) ')';
  }

  #tc-table-section {
    overflow-x: auto;
    overflow-y: hidden;
    margin-bottom: 5em;
  }

  table.tc-table,
  table.tc-table td,
  table.tc-table th {
    border: 1px solid #000;
  }

  table.tc-table {
    width: 1000px;
    border-collapse: collapse;
    text-align: left;
  }

  table.tc-child-table {
    margin: 0.75em 0;
    border-collapse: collapse;
    text-align: center;
  }

  table.tc-table > tr > td:first-child,
  table.tc-table > tr > th:first-child {
    width: 30%;
  }

  table.tc-table td,
  table.tc-table th {
    padding: 0.75em;
    vertical-align: top;
  }

  table.tc-child-table td,
  table.tc-child-table th {
    vertical-align: middle;
  }

  table.tc-table .tc-table-header td {
    padding-top: 1.25em;
  }

  table.tc-table .tc-table-header {
    border: 1px solid #000;
    background-color: #2e74b5;
    color: #fff;
  }
`

const TermAndConditionGenerator = () => {
  const [inputText, setInputText] = useState<string>('')
  const [textArray, setTextArray] = useState<
    {
      originalLine: string
      topicName?: string
      level?: number
    }[]
  >([])
  const [htmlText, setHtmlText] = useState<string>('<h1>Hello World!</h1>')
  const [previewElement, setPreviewElement] = useState<HTMLElement | null>(null)

  console.log('🚀 ~ file: index.tsx:5 ~ TermAndConditionGenerator ~ inputText:', inputText)
  console.log('🚀 ~ file: index.tsx:7 ~ TermAndConditionGenerator ~ textArray:', textArray)
  const regexAccept = [
    {
      regex: /^\u2022 /,
      level: 3
    },
    {
      regex: /^\d+\.\d+ /,
      level: 2
    },
    {
      regex: /^\d+\. /,
      level: 1
    }
  ]

  const handleTextAreaChange = (inputValue: string) => {
    const newText = inputValue
    setInputText(newText)

    // Split the text into an array using line breaks
    const newArray = newText.split('\n')

    // Process each line
    const processedArray = newArray.map((line) => {
      // Check if the line matches a numeric pattern
      console.log('🚀 ~ file: index.tsx:21 ~ processedArray ~ line:', line)

      const matchRegexObj = regexAccept.find((regexObj) => {
        if (RegExp(regexObj.regex).exec(line)) {
          return regexObj
        }
      })

      return matchRegexObj
        ? {
            originalLine: line,
            topicName: line.replace(matchRegexObj.regex, ''),
            level: matchRegexObj.level
          }
        : { originalLine: line }
    })

    setTextArray(processedArray)
  }

  const generateElement = () => {
    return (
      <>
        {textArray?.map((text, index) => {
          return (
            <p key={`text-element-${String(index)}`}>
              {text?.level ? `level-${text.level} => ` : ''}
              {text?.topicName ?? ''}
            </p>
          )
        })}
      </>
    )
  }

  useEffect(() => {}, [textArray])

  return (
    <div id='deeplink-generator-wrapper' className='min-w-full'>
      <p className='text-xl'>Term and condition Generator</p>
      <div id='content-wrapper' className='grid gap-5 my-5'>
        <div className='flex gap-5' style={{ minHeight: '500px' }}>
          <div className='w-6/12 h-full'>
            <p className='text-l pb-3'>HTML Code</p>
            <textarea
              className='textarea textarea-primary h-full w-full'
              placeholder='T&C'
              onChange={(e) => handleTextAreaChange(e?.target?.value)}
            />
          </div>
          <div id='preview' className='w-6/12 h-full'>
            <p className='text-l pb-3'>Preview</p>
            <div className='p-5 border rounded h-full'>
              <TermsAndConditionsPreviewStyle>
                {ReactHtmlParser(htmlText)}
              </TermsAndConditionsPreviewStyle>
            </div>
          </div>
        </div>
        {/* <div id="preview" className="border rounded p-5" style={{ minHeight: '150px' }}>
                </div> */}
        <div className='pt-10'>
          <textarea
            className='textarea textarea-primary w-full'
            placeholder='T&C'
            onChange={(e) => handleTextAreaChange(e?.target?.value)}
            rows={10}
          />
        </div>
        {/* <div id="button-wrapper" className="flex justify-end">
                    <button className="btn btn-primary" onClick={() => {
                        const previewEle = document.getElementById('preview')
                        if (previewEle) {
                            previewEle.append(generateElement())
                        }
                    }}>Preview</button>
                </div> */}
      </div>
    </div>
  )
}

export default TermAndConditionGenerator
