import React, {JSX, useState, useEffect} from 'react'
import {Article} from "../../types/article";
import {getArticles} from "../../services/Articles.api";
import ArticleCard from "../../components/articleCard/ArticleCard";
import styles from './homePage.module.scss';


export default function HomePage(): JSX.Element {
    const [articles, setArticles] = useState<Article[]>([])

    useEffect(() => {
        getArticles().then(data => {
            setArticles(data)
            console.log(data)
        })
    }, [])

    return (
        <section className={styles.homePage}>
            <div className={styles.articlesContainer}>
                {articles.map(article => (
                    <ArticleCard title={article.title} summary={article.summary} image_url={article.image_url} id={article.id} published_at={article.published_at} />
                ))}
            </div>
        </section>
    )
}
