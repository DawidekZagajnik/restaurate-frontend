import React from "react";
import apiCall from "./apiCall";



export default function useAutoLoad({ url, pageSize, query }) {

    const itemList = React.useRef([]);
    const [page, setPage] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const hasMore = React.useRef(false);
    const observer = new IntersectionObserver((entries, observer) => {
        let entry = entries[0];
        if (entry.isIntersecting) {
            setPage(page + 1);
            observer.disconnect();
        }
    })

    React.useEffect(() => {
        hasMore.current = false;
        itemList.current = [];
        setPage(0);
    }, [query, url, pageSize])


    React.useEffect(() => {
        setLoading(true);
        setError(null);
        apiCall({
            url: `${url}?pagesize=${pageSize}&page=${page}${query ? "&query=" + query : ""}`,
            method: "GET"
        })
        .then(response => {
            itemList.current = page === 0 ? response.data.result : [...itemList.current, ...response.data.result];
            hasMore.current = response.data.has_more;
        })
        .catch(e => {
            setError(e.response?.data || "An unknown error occurred")
        })
        .finally(() => {
            setLoading(false);
        })
    }, [page, query, url, pageSize])

    return {
        observer: observer,
        loading: loading,
        error: error,
        items: itemList.current,
        hasMore: hasMore.current
    };
}