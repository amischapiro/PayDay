import { useDispatch } from "react-redux"
import { ActivityPreview } from "./ActivityPreview"
import { loadActivities, fetchLastActivity } from '../store/activity.action'
import { useCallback, useEffect, useRef, useState } from "react"
import { socketService } from "../services/socket.service"

export const ActivityList = ({ activities, selectedBoard, selectedStoryIds, getInitials, isPerStory }) => {

    const dispatch = useDispatch()

    const { storyId: selectedStoryId } = selectedStoryIds
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        dispatch({ type: 'RESET_ACTIVITIES' })
        if (isPerStory) dispatch(loadActivities(selectedStoryId))
        else dispatch(loadActivities())
        setIsLoading(false)
    }, [dispatch, selectedBoard._id, isPerStory, selectedStoryId])


    useEffect(() => {
        socketService.on('board has updated', () => {
            dispatch(fetchLastActivity())
        })
        return () => {
            socketService.off('board has updated')
        }
    }, [dispatch])

    const loadMoreActivities = () => {
        setIsLoading(true)
        if (selectedStoryId) dispatch(loadActivities(selectedBoard))
        else dispatch(loadActivities())
        setIsLoading(false)

    }

    const observer = useRef()
    const lastActivity = useCallback(node => {
        if (isLoading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                loadMoreActivities()
            }
        })
        if (node) observer.current.observe(node)
    }, [isLoading])

    return (
        <>
            {activities.map((activity, idx) => {
                if (idx === activities.length - 1) return (
                    <div ref={lastActivity} key={activity._id}>
                        <ActivityPreview
                            activity={activity}
                            selectedBoard={selectedBoard}
                            getInitials={getInitials}
                        />
                    </div>
                )
                else return (
                    <div key={activity._id}>
                        <ActivityPreview
                            activity={activity}
                            selectedBoard={selectedBoard}
                            getInitials={getInitials}
                        />
                    </div>
                )
            })}
            <button onClick={loadMoreActivities}>Load More</button>
            {isLoading && (
                <div>Loading...</div>
            )}
        </>
    )
}