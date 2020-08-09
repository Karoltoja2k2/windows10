import React, { useState, useEffect } from "react";

import "./bar.scss";
import Files from "../../../models/fileStructure2";
import File from "../../../models/File";

import {
    faArrowLeft,
    faArrowUp,
    faArrowRight,
    faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileIcon from "../../common/icons/FileIcon.component";
import { useDispatch } from "react-redux";
import { OpenWindow, Navigate } from "../../../actions/windowsActions";
import SearchResultIcon from "../../common/icons/searchResultIcon.component";

const Bar = (props: any) => {
    const dispatch = useDispatch();

    const [search, setSearch] = useState({
        filter: "",
        path: props.file.path + props.file.title,
        showResults: false,
        results: Array<File>(),
    });

    useEffect(() => {
        setSearch({
            ...search,
            path: props.file.path + props.file.title,
        });
    }, [props.file]);

    const searchFile = (path: string) => {
        // THIS DOESNT SHOW ANY FILE WHEN DELETED ALL CHARS FROM FILTER
        if (!path) {
            setSearch({
                ...search,
                showResults: false,
                results: [],
                filter: "",
            });
            return;
        }
        let files = Files.filter((x) =>
            x.title.toLowerCase().includes(path.toLowerCase())
        );
        setSearch({
            ...search,
            filter: path,
            showResults: true,
            results: files,
        });
    };

    function LocalNavigate(id: number, file: File) {
        setSearch({
            ...search,
            filter: "",
            showResults: false,
        });
        file.extension === ".fld"
            ? dispatch(Navigate(id, file))
            : dispatch(OpenWindow(file));
    }

    return (
        <div className="container__bar">
            <button
                className={
                    props.file.prevFolder != null
                        ? "bar__button bar__button--enabled"
                        : "bar__button bar__button--disabled"
                }
                onClick={() => {
                    props.previousFolder();
                }}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button className="bar__button bar__button--disabled">
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <button className="bar__button bar__button--disabled">
                <FontAwesomeIcon icon={faAngleDown} />
            </button>
            <button className="bar__button bar__button--disabled">
                <FontAwesomeIcon icon={faArrowUp} />
            </button>

            <div className="bar__search--drive">
                <div className="search__input">
                    <input
                        type="text"
                        id="searchInput"
                        value={search.filter}
                        onChange={(e) => {
                            console.log(e.target.value);
                            searchFile(e.target.value);
                        }}
                        onKeyDownCapture={(e) => {
                            if (e.key === "Enter") {
                                searchFile(search.path);
                            }
                        }}
                        placeholder={search.path}
                    />
                    <button
                        className="bar__button bar__button--enabled"
                        onClick={() => {
                            setSearch({
                                ...search,
                                showResults: !search.showResults,
                            });
                        }}
                    >
                        <FontAwesomeIcon icon={faAngleDown} />
                    </button>
                </div>
                <div
                    className={
                        search.showResults
                            ? "search__results--active search__results scrollbar--dark"
                            : "search__results"
                    }
                >
                    {search.results.map((result: File, index: number) => (
                        <SearchResultIcon
                            file={result}
                            id={props.id}
                            key={index}
                        />
                    ))}
                </div>
            </div>

            <div className="bar__search--local">
                <input
                    type="text"
                    onChange={(e) => {
                        props.filterFiles(e.target.value);
                    }}
                    placeholder="Search"
                ></input>
            </div>
        </div>
    );
};

export default Bar;
