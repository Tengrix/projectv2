import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../a1-main/BLL/store";
import {cardType} from "../../../a1-main/DAL/mainAPI";
import React, {useState} from "react";
import {getCardsTC, getGradeTC, setLearningModeOn} from "../../../a1-main/BLL/cardReducer";
import {Button, makeStyles, Modal} from "@material-ui/core";
import {RequestStatusType} from "../../../a1-main/BLL/authReducer";

type LearningCardsType = {
    status: RequestStatusType;
    packId: string
}

function rand() {
    return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
    const top = 50 + rand()
    const left = 50 + rand()

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 500,
        backgroundColor: "lightpink",
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))


const LearningCards = (props: LearningCardsType) => {
    const dispatch = useDispatch()
    const cards = useSelector<AppRootStateType, cardType[]>(state => state.cards.cards)
    const cardsTotal = useSelector<AppRootStateType,number>(state => state.cards.cardsTotalCount)
    const [numQA, setNumQA] = useState<number>(0)
    const [countA, setCountA] = useState<number>(1)
    const grade = ["super easy", "easy", "just fine", "hard", "super hard"]
    const [show, setShow] = useState<boolean>(false)
    const [randomQ, setRandomQ] = useState<boolean>(false)
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
        dispatch(setLearningModeOn({modeOn:true}))
        dispatch(getCardsTC(props.packId))
    };
    const handleClose = () => {
        setOpen(false);
    };
    const showAnswer = () => {
        setShow(!show)
    }
    let getAllQuestion: Array<any> = []
    let getAllRandomQuestion: Array<any> = []
    let getAllAnswers: Array<string | number> = []
    let getIdOfQuestion: Array<string> = []
    let out: Array<number> = [];
    cards.map((el) => (getAllQuestion.push([el.question]), getAllAnswers.push(el.answer),
        getIdOfQuestion.push(el._id), getAllRandomQuestion.push([el.question])))
    cards.map((el, i) => getAllQuestion[i].push(el.grade))
    for (let i = 0; i < getAllQuestion.length; ++i) {
        for (let j = 0; j < getAllQuestion[i][1]; ++j) {
            out.push(getAllQuestion[i][0]);
        }
    }
    const nextQuestion = () => {
        setNumQA(numQA + 1)
        setCountA(countA + 1)
        if (randomQ) {
            setNumQA(out[Math.floor(Math.random() * out.length)])
            setCountA(countA + 1)
        }
    }
    const startAgain = () => {
        setRandomQ(true)
        setCountA(1)
    }
    const newGrades = (grade: number, id: string, packId: string) => {
        dispatch(getGradeTC(grade, id, packId))
        nextQuestion()
    }
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Learn "Pack Name"</h2>
            <div id="simple-modal-description">
                <span>
                    Question number: {countA}/{cardsTotal}{" "}
                </span>
                <div>{randomQ ? out[Math.floor(Math.random() * out.length)] : getAllRandomQuestion[numQA]}</div>
                <div>
                    <Button
                        color="primary"
                        variant={"outlined"}
                        disabled={false}
                        onClick={showAnswer}
                    >
                        show answer
                    </Button>
                </div>
                <div>{show ? getAllAnswers[numQA] : ""}</div>
            </div>
            <div>
                {countA === cardsTotal ? (
                        <Button
                            color="secondary"
                            variant={"outlined"}
                            onClick={() => {
                                startAgain()
                            }}
                        >
                            start again
                        </Button>
                    ) :
                    <div>
                        <h4>Rate Yourself</h4>
                        {grade.map((el, i) => (
                            <Button
                                key={"grade-" + i}
                                onClick={() => newGrades(i + 1, getIdOfQuestion[numQA], props.packId)}
                            >
                                {el}
                            </Button>
                        ))}
                    </div>}
            </div>
            <Button color="secondary" variant="outlined" onClick={handleClose}>
                Cancel
            </Button>
            {countA === cardsTotal ? (
                <Button
                    color="primary"
                    variant={"outlined"}
                    disabled={true}
                    onClick={() => {
                        startAgain()
                    }}
                >
                    {" "}
                    Next{" "}
                </Button>
            ) : (
                <Button
                    color="primary"
                    variant={"outlined"}
                    disabled={false}
                    onClick={() => {
                        nextQuestion()
                    }}
                >
                    {" "}
                    Next{" "}
                </Button>
            )}
        </div>
    )
    return (
        <div>
            <div>

                <Button
                    variant="outlined"
                    color="primary"
                    type="button"
                    onClick={handleOpen}
                    disabled={props.status === 'loading'}
                >
                    Learning MODE
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
            </div>
        </div>
    )
}
export default LearningCards;