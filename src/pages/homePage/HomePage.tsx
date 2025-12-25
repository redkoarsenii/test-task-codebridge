import React, { JSX, useState, useEffect } from 'react'
import { Article } from "../../types/article"
import { getArticles } from "../../services/Articles.api"
import ArticleCard from "../../components/articleCard/ArticleCard"
import styles from './homePage.module.scss'
import SearchBar from "../../components/searchBar/SearchBar"
import ArticleCounter from "../../components/articleCounter/ArticleCounter"

export default function HomePage(): JSX.Element {
    const [articles, setArticles] = useState<Article[]>([])
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
    const [searchQuery, setSearchQuery] = useState<string>('')

    useEffect(() => {
        getArticles().then(data => {
            setArticles(data)
            setFilteredArticles(data)
        })
    }, [])

    const handleSearch = (query: string) => {
        setSearchQuery(query)

        if (!query.trim()) {
            setFilteredArticles(articles)
            return
        }

        const keywords = query.toLowerCase().split(' ').filter(k => k.length > 0)

        const scored = articles.map(article => {
            let score = 0
            let titleMatches = 0
            let summaryMatches = 0

            keywords.forEach(keyword => {
                if (article.title.toLowerCase().includes(keyword)) {
                    titleMatches++
                    score += 10 // Більший пріоритет для title
                }
                if (article.summary.toLowerCase().includes(keyword)) {
                    summaryMatches++
                    score += 1
                }
            })

            return { article, score, titleMatches, summaryMatches }
        })

        // Фільтруємо і сортуємо за скором
        const filtered = scored
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(item => item.article)

        setFilteredArticles(filtered)
    }

    return (
        <section className={styles.homePage}>
            <SearchBar onSearch={handleSearch} />

            <ArticleCounter articlesCount={filteredArticles.length} />

            <div className={styles.articlesContainer}>
                {filteredArticles.map(article => (
                    <ArticleCard
                        key={article.id}
                        title={article.title}
                        summary={article.summary}
                        image_url={article.image_url}
                        id={article.id}
                        published_at={article.published_at}
                        searchQuery={searchQuery}
                    />
                ))}
            </div>
        </section>
    )
}
