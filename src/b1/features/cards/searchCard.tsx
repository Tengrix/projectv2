import {ChangeEvent, useState} from "react";
import s from '../packs/search.module.css'
import {getCardsTC} from "../../../a1-main/BLL/cardReducer";
import {useDispatch} from "react-redux";
type SearchType={
    search:(question:string,answer:string)=>void;
    packID: string
}

const SearchCard = (props:SearchType) => {
    const dispatch = useDispatch()
    const [searchMode, setSearchMode] = useState<boolean>(false)
    const [question,setQuestion] = useState<string>('')
    const [answer,setAnswer] = useState<string>('')
    const activateMode = () => {
        setSearchMode(!searchMode)
    }
    const onSearchQuestionHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setQuestion(e.currentTarget.value)
    }
    const onSearchAnswerHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setAnswer(e.currentTarget.value)
    }
    const onClickHandler = () => {
        props.search(question,answer)
        setQuestion('')
        setAnswer('')

    }
    return(
        <span>
            <button onClick={activateMode}>find</button>
            {searchMode &&
                <span>
                    <button onClick={onClickHandler}>search</button>
                    <div>
                            <input type="text"
                                   className={s.SearchInput}
                                   value={question}
                                   onChange={onSearchQuestionHandler}
                                   placeholder={'Search question'}
                            />
                    </div><div>
                            <input type="text"
                                   value={answer}
                                   className={s.SearchInput}
                                   onChange={onSearchAnswerHandler}
                                   placeholder={'Search answer'}
                            />
                    </div>
                </span>
            }
        </span>
    )
}
export default SearchCard;