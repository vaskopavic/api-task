import { ref } from 'vue';

export const getHostFromUrl = (url) => {
    if (!url) return;
    const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
    const parts = host.split('.').slice(-3)
    if (parts[0] === 'www') parts.shift()
    return parts.join('.')
}

export const formatTimeAgo = (time) => {
    if (!time) return;
    const date = new Date(time);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const years = Math.floor(diffInSeconds / (365 * 24 * 60 * 60));
    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;

    const months = Math.floor(diffInSeconds / (30 * 24 * 60 * 60));
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;

    const days = Math.floor(diffInSeconds / (24 * 60 * 60));
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;

    const hours = Math.floor(diffInSeconds / (60 * 60));
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

    return `just now`;
};


export const countComments = (data) => {
    if (!data || !data.children || !Array.isArray(data.children)) {
        return 0;
    }
    return data.children.reduce((count, child) =>
        count + 1 + (child.children ? countComments(child) : 0), 0
    );
};


export const searchQueryRef = ref('');