import { useRef, useState, useEffect } from 'react'

import { CardContentForm } from './card-elements/CardContentForm'

import { useOutsideClick } from '../../hooks/useOutsideClick'

import styles from './Card.module.css'
import { CardModelData } from '../../data'
import { formatDate } from '../../utils/dates'

interface CardProps extends CardModelData {
  onUpdateCard?(updatedCard: CardModelData): void
  onDeleteCard?(cardId: number): void
}

export const Card = (props: CardProps) => {
  const ref = useRef(null)
  const [isEditing, setEditing] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const cardRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLParagraphElement>(null)
  const contentRef = useRef<HTMLParagraphElement>(null)

  const handleSetEditingOff = () => {
    setEditing(false)
  }

  useOutsideClick(ref, handleSetEditingOff)

  const handleSetEditingOn = () => {
    setEditing(true)
  }

  const adjustFontSize = () => {
    if (contentRef.current && cardRef.current) {
      const contentTop = contentRef.current.getBoundingClientRect().top
      const contentBottom = contentRef.current.getBoundingClientRect().bottom

      const cardRect = cardRef.current.getBoundingClientRect().top
      const dateRect = contentTop - cardRect

      const availableSpace = cardRect - dateRect - 20

      if (contentBottom - contentTop > availableSpace) {
        setFontSize((prevFontSize) => Math.max(prevFontSize - 2, 4))
      } else {
        setFontSize((prevFontSize) => {
          let newSize = prevFontSize

          let adjusted = false;

          while (newSize < 16) {
            newSize += 2;
            if (contentRef.current) {
              contentRef.current.style.fontSize = `${newSize}px`;
              const { top, bottom } = contentRef.current.getBoundingClientRect();
              const newContentHeight = bottom - top;

              if (newContentHeight > availableSpace) {
                contentRef.current.style.fontSize = `${newSize - 2}px`;
                adjusted = true;
                newSize -= 2;
                break;
              }
            } else {
              break;
            }
          }

          if (!adjusted) {
            return newSize;
          }

          return prevFontSize
        })
      }
    }
  }

  useEffect(() => {
    let initialRender = true

    if (initialRender) {
      initialRender = false
      return
    }

    adjustFontSize()
  }, [])

  useEffect(() => {
    adjustFontSize()
  }, [props.content])

  const handleSaveContent = (values: CardModelData) => {
    props.onUpdateCard && props.onUpdateCard(values)
    handleSetEditingOff()
    adjustFontSize()
  }

  return (
    <div
      data-cy={`card-${props.id}`}
      className={styles.card}
      onClick={handleSetEditingOn}
      ref={cardRef}
    >
      <p ref={dateRef} className={styles.date}>
        {props.createdAt ? formatDate(props.createdAt) : 'Date'}
      </p>
      {!isEditing ? (
        <p
          ref={contentRef}
          className={styles.content}
          style={{ fontSize: `${fontSize}px` }}
        >
          {props?.content || 'Click to start noting'}
        </p>
      ) : (
        <CardContentForm
          initialValues={props}
          onSubmit={handleSaveContent}
          onDeleteCard={props.onDeleteCard}
        />
      )}
    </div>
  )
}