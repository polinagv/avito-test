import GameItem from './GameItem/GameItem.tsx'
import { useParams } from 'react-router-dom'
import GameNotFound from './GameNotFound/GameNotFound.tsx'

import { useFetchGameById, useShowErrorNotification } from 'common/hooks.ts'
import Spinner from 'components/Spinner'
import ReturnButton from 'components/ReturnButton'
import { GameDetailsPageWrap } from 'pages/GameDetailsPage/styles.ts'

const GameDetailsPage = () => {
    const { id } = useParams<{ id: string }>()
    const { game, gameLoadingState } = useFetchGameById(Number(id))
    const notification = useShowErrorNotification({
        loadingState: gameLoadingState,
    })

    if (gameLoadingState === 'pending') {
        return <Spinner />
    }

    return (
        <GameDetailsPageWrap>
            {notification}
            <ReturnButton to={'/'} />
            {game ? <GameItem game={game} /> : <GameNotFound />}
        </GameDetailsPageWrap>
    )
}

export default GameDetailsPage
