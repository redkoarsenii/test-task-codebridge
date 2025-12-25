import React, {JSX, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {Article} from "../../types/article";
import {getArticleById} from "../../services/Articles.api";

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
        <div>
            <h1>{article.title}</h1>
            {article.image_url && <img src={article.image_url} alt={article.title} />}
            <p>{article.summary}</p>
            <p>Опубліковано: {new Date(article.published_at).toLocaleDateString()}</p>
        </div>
    )
}
