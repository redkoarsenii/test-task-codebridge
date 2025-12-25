import {Article} from "../types/article";

const BASE_URL : string = 'https://api.spaceflightnewsapi.net/v4/articles'

export async function getArticles(): Promise<Article[]> {
    const res = await fetch(`${BASE_URL}/?limit=50`)
    const data = await res.json()
    return data.results
}

export async function getArticleById(id: string): Promise<Article> {
    const res = await fetch(`${BASE_URL}/${id}`)
    return res.json()
}
