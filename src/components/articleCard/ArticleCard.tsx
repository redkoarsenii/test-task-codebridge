import React, { JSX } from 'react'
import { Article } from "../../types/article"
import { Link } from "react-router-dom"
import styles from './articleCard.module.scss'

interface ArticleCardProps extends Article {
    searchQuery?: string
}

export default function ArticleCard({
                                        id,
                                        title,
                                        summary,
                                        published_at,
                                        image_url,
                                        searchQuery = ''
                                    }: ArticleCardProps): JSX.Element {

    const date = new Date(published_at)
    const day = date.getDate()
    const year = date.getFullYear()
    const month = date.toLocaleString('en-US', { month: 'long' })

    function getOrdinal(n: number): string {
        if (n >= 11 && n <= 13) return 'th'
        switch (n % 10) {
            case 1: return 'st'
            case 2: return 'nd'
            case 3: return 'rd'
            default: return 'th'
        }
    }

    // Функція для підсвічування текста
    function highlightText(text: string, query: string): (string | JSX.Element)[] {
        if (!query.trim()) return [text]

        const keywords = query.toLowerCase().split(' ').filter(k => k.length > 0)
        const regex = new RegExp(`(${keywords.join('|')})`, 'gi')
        const parts = text.split(regex)

        return parts.map((part, index) =>
            regex.test(part) ? (
                <mark
                    key={index}
                    style={{ backgroundColor: '#FFFF00', fontWeight: 'bold' }}
                >
                    {part}
                </mark>
            ) : (
                part
            )
        )
    }

    const displayTitle = title.length > 50 ? title.slice(0, 50) + '...' : title
    const displaySummary = summary.length > 100 ? summary.slice(0, 100) + '...' : summary

    return (
        <div className={styles.articleCard}>
            <div className={styles.articleCard__imgContainer}>
                <img
                    className={styles.articleCard__img}
                    src={image_url}
                    alt="article image"
                    loading="lazy"
                    decoding="async"
                />
            </div>

            <div className={styles.articleCard__main_content}>
                <div className={styles.articleCard__infoContainer}>
                    <p className={styles.articleCard__published_at_info}>
                        {month} {day}{getOrdinal(day)}, {year}
                    </p>

                    <h3 className={styles.articleCard__title_info}>
                        {highlightText(displayTitle, searchQuery)}
                    </h3>

                    <p className={styles.articleCard__summary_info}>
                        {highlightText(displaySummary, searchQuery)}
                    </p>
                </div>

                <Link className={styles.articleCard__btnContainer} to={`/articles/${id}`}>
                    <button className={styles.articleCard__btn}>Read more</button>
                </Link>
            </div>
        </div>
    )
}
