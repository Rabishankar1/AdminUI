import React, { useEffect, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

function Pagination({ length, pageClicked, currentPage }) {

    const lastPagination = Math.floor(length / 10) + ((length % 10) ? 1 : 0);

    const [pages, setPages] = useState([]);
    const [firstPage, setFirstPage] = useState(1);
    const [lastPage, setLastPage] = useState(5);

    useEffect(() => {
        const arr = [];
        for (let i = firstPage; i <= Math.min(lastPage, lastPagination); i++) {
            arr.push(i)
        }
        setPages(arr)

    }, [length, firstPage, lastPage])


    const handleNext = () => {
        pageClicked(currentPage + 1);
        let first = lastPage < lastPagination ? firstPage + 1 : firstPage;
        let last = lastPage < lastPagination ? lastPage + 1 : lastPage;
        setFirstPage(first);
        setLastPage(last);
    }

    const handleMultiNext = () => {
        pageClicked(lastPagination);
        let first = Math.max(1, lastPagination - 5);
        let last = lastPagination;
        setFirstPage(first);
        setLastPage(last);
    }

    const handlePrev = () => {
        pageClicked(currentPage - 1);
        let first = firstPage > 1 ? firstPage - 1 : firstPage;
        let last = firstPage > 1 ? lastPage - 1 : lastPage;
        setFirstPage(first);
        setLastPage(last);
    }


    const handleMultiPrev = () => {
        pageClicked(1);
        let first = 1;
        let last = Math.min(5, lastPagination);
        setFirstPage(first);
        setLastPage(last);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
            <button
                disabled={(currentPage === 1) ? true : false}
                className='pagination-button btn'
                onClick={handleMultiPrev}>
                <KeyboardDoubleArrowLeftIcon sx={{ fontSize: 'small' }} />
            </button>
            <button
                disabled={(currentPage === 1) ? true : false}
                className='pagination-button btn' onClick={handlePrev}>
                <ChevronLeftIcon sx={{ fontSize: 'small' }} />
            </button>

            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => pageClicked(page)}
                    className={page === currentPage ? 'pagination-button btn selected' : 'pagination-button btn'}
                >{page}</button>
            ))}

            <button
                disabled={(currentPage === lastPagination) ? true : false}
                onClick={handleNext} className='pagination-button btn'>
                <ChevronRightIcon sx={{ fontSize: 'small' }} />
            </button>
            <button
                disabled={(currentPage === lastPagination) ? true : false}
                className='pagination-button btn'
                onClick={handleMultiNext}
            >
                <KeyboardDoubleArrowRightIcon sx={{ fontSize: 'small' }} />
            </button>
        </div>
    )
}

export default Pagination