import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';
import axios from 'axios';

const News = () => {
    const [news, setNews] = useState([]);

    const apiKey = import.meta.env.REACT_APP_NEWS_API_KEY;

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const result = await axios.get(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`);
                setNews(result.data.results.slice(0, 5));
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
        fetchNews();
    }, []);

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
                Top News
            </Typography>
            {news.map((item, index) => (
                <Paper key={index} elevation={3} sx={{ mb: 2, p: 2 }}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2">{item.byline}</Typography>
                    {item.multimedia && item.multimedia.length > 0 && (
                        <img src={item.multimedia[0].url} alt={item.title} style={{ width: "100%" }} />
                    )}
                    <Typography>{item.abstract}</Typography>
                    <Typography component="a" href={item.url} target="_blank" rel="noopener noreferrer">
                        Read more on NYT
                    </Typography>
                </Paper>
            ))}
        </Box>
    );
};

export default News;