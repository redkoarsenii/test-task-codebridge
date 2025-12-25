import React, {JSX, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {Article} from "../../types/article";
import {getArticleById} from "../../services/Articles.api";
import styles from './articlePage.module.scss';

export default function ArticlePage(): JSX.Element {
    const { id } = useParams<{ id: string }>()
    const [article, setArticle] = useState<Article | null>(null)

    useEffect(() => {
        if (id) {
            getArticleById(id).then(data => setArticle(data))
        }
    }, [id])

    if (!article) return <div>Завантаження...</div>

    return (
        <section className={styles.article}>

            <div className={styles.article__image_container}>
                <img className={styles.article__image} src={article.image_url} alt={article.title} />
            </div>

            <article className={styles.article__content}>
                <h1 className={styles.article__content_title}>{article.title}</h1>

                <p className={styles.article__content_summary}>{article.summary}</p>
            </article>


            <div className={styles.article__btn_container}>
                <a href='/' className={styles.article__btn}>Back to homepage</a>
            </div>

        </section>
    )
}
