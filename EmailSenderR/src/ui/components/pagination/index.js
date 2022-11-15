import React from "react";
import Pagination from "react-bootstrap/Pagination";

const CustomPager = ({ currentPage, totalPages, onClick: handleClick }) => {
    return (
        <div className="_CustomPager">
            {totalPages > 0 && (
                <Pagination>
                    <Pagination.Prev
                        disabled={currentPage === 1}
                        onClick={() => {
                            handleClick(currentPage - 1);
                        }}
                    />
                    {/* If number of pages are less than 5 */}
                    {currentPage < 5 && (
                        <>
                            <Pagination.Item
                                active={currentPage === 1}
                                onClick={() => {
                                    handleClick(1);
                                }}
                            >
                                1
                            </Pagination.Item>
                            {totalPages > 2 && (
                                <Pagination.Item
                                    active={currentPage === 2}
                                    onClick={() => {
                                        handleClick(2);
                                    }}
                                >
                                    2
                                </Pagination.Item>
                            )}
                            {totalPages > 3 && (
                                <Pagination.Item
                                    active={currentPage === 3}
                                    onClick={() => {
                                        handleClick(3);
                                    }}
                                >
                                    3
                                </Pagination.Item>
                            )}
                            {totalPages > 4 && (
                                <Pagination.Item
                                    active={currentPage === 4}
                                    onClick={() => {
                                        handleClick(4);
                                    }}
                                >
                                    4
                                </Pagination.Item>
                            )}
                            {totalPages > 5 && (
                                <>
                                    <Pagination.Item
                                        active={currentPage === 5}
                                        onClick={() => {
                                            handleClick(5);
                                        }}
                                    >
                                        5
                                    </Pagination.Item>
                                    <Pagination.Ellipsis disabled={true} />
                                    <Pagination.Item
                                        onClick={() => {
                                            handleClick(totalPages);
                                        }}
                                    >
                                        {totalPages}
                                    </Pagination.Item>
                                </>
                            )}
                        </>
                    )}

                    {currentPage >= 5 && currentPage <= totalPages - 4 && (
                        <>
                            <Pagination.Item
                                active={currentPage === 1}
                                onClick={() => {
                                    handleClick(1);
                                }}
                            >
                                1
                            </Pagination.Item>
                            {totalPages > 5 && <Pagination.Ellipsis disabled={true} />}
                            <Pagination.Item
                                onClick={() => {
                                    handleClick(currentPage - 1);
                                }}
                            >
                                {currentPage - 1}
                            </Pagination.Item>
                            <Pagination.Item
                                active={true}
                                onClick={() => {
                                    handleClick(currentPage);
                                }}
                            >
                                {currentPage}
                            </Pagination.Item>
                            <Pagination.Item
                                onClick={() => {
                                    handleClick(currentPage + 1);
                                }}
                            >
                                {currentPage + 1}
                            </Pagination.Item>
                            <Pagination.Ellipsis disabled={true} />
                            <Pagination.Item
                                onClick={() => {
                                    handleClick(totalPages);
                                }}
                            >
                                {totalPages}
                            </Pagination.Item>
                        </>
                    )}

                    {currentPage > totalPages - 4 && (
                        <>
                            <Pagination.Item
                                active={currentPage === 1}
                                onClick={() => {
                                    handleClick(1);
                                }}
                            >
                                1
                            </Pagination.Item>
                            <Pagination.Ellipsis disabled={true} />
                            {totalPages - 4 > 2 && (
                                <>
                                    <Pagination.Item
                                        onClick={() => {
                                            handleClick(totalPages - 4);
                                        }}
                                    >
                                        {totalPages - 4}
                                    </Pagination.Item>
                                </>
                            )}
                            <Pagination.Item
                                active={currentPage === totalPages - 3}
                                onClick={() => {
                                    handleClick(totalPages - 3);
                                }}
                            >
                                {totalPages - 3}
                            </Pagination.Item>
                            <Pagination.Item
                                active={currentPage === totalPages - 2}
                                onClick={() => {
                                    handleClick(totalPages - 2);
                                }}
                            >
                                {totalPages - 2}
                            </Pagination.Item>
                            <Pagination.Item
                                active={currentPage === totalPages - 1}
                                onClick={() => {
                                    handleClick(totalPages - 1);
                                }}
                            >
                                {totalPages - 1}
                            </Pagination.Item>
                            <Pagination.Item
                                active={currentPage === totalPages}
                                onClick={() => {
                                    handleClick(totalPages);
                                }}
                            >
                                {totalPages}
                            </Pagination.Item>
                        </>
                    )}

                    <Pagination.Next
                        disabled={currentPage === totalPages}
                        onClick={() => {
                            handleClick(currentPage + 1);
                        }}
                    />
                </Pagination>
            )}
        </div>
    );
};

export default CustomPager;
