import React from 'react';
import Weather from './components/Weather';
import News from './components/News';
import { Box } from '@mui/material';

function App() {
    return (
        <Box sx={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#6D2AFF', color: 'white' }}>
            <Box sx={{ flex: 1, overflowY: 'auto', p: 2, borderRight: 1, borderColor: 'divider' }}>
                <News />
            </Box>
            <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
                <Weather />
            </Box>
        </Box>
    );
}

export default App;