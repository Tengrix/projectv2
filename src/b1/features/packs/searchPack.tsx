import {ChangeEvent, useState} from "react";
import s from './search.module.css'
type SearchType={
    onChange:(event:ChangeEvent<HTMLInputElement>)=>void;
    question:string;
}

const SearchPack = (props:SearchType) => {
    const [searchMode, setSearchMode] = useState<boolean>(false)
    const [searchQue, setSearchQue] = useState<boolean>(false)
    const [searchAnswer, setSearchAnswer] = useState<boolean>(false)
    const activateMode = () => {
        setSearchMode(!searchMode)
        setSearchAnswer(false)
        setSearchQue(false)
    }
    return(
        <span>
            <button onClick={activateMode}>find</button>
            {searchMode &&
                <span>
                    { searchQue ? <div>
                            <input type="text"
                                   className={s.SearchInput}
                                   onChange={props.onChange}
                                   placeholder={'Search question'}
                            />
                    </div>:
                        <span>
                             <button onClick={()=>setSearchAnswer(!searchAnswer)}>answer</button>
                        </span>

                    }
                    {searchAnswer ? <div>
                            <input type="text"
                                   className={s.SearchInput}
                                   onChange={props.onChange}
                                   placeholder={'Search answer'}
                            />
                    </div> :
                        <button onClick={()=>setSearchQue(!searchQue)}>question</button>
                    }
                </span>
            }
        </span>
    )
}
export default SearchPack;