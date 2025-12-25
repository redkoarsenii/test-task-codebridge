import React, {JSX} from 'react'
import styles from './articleCounter.module.scss';

interface IArticleCounterProps {
    articlesCount: number;
}

export default function ArticleCounter( {articlesCount}:IArticleCounterProps ):JSX.Element {
    return (
        <div className={styles.articleCounter}>

            <p className={styles.articleCounter__mainText}>Results: {articlesCount}</p>

            <hr className={styles.articleCounter__line} />

        </div>
    )
}
