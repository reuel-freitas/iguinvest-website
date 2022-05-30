import { CircularProgress } from '@mui/material';

export const InnerLoading = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 100000,
        backgroundColor: 'gray',
        opacity: .7
    }}>
        <CircularProgress />
    </div>
)

export const Loading = () => (
    <div style={{
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 9999,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#54545460'
    }}>
        <CircularProgress color='primary'/>
    </div>
)