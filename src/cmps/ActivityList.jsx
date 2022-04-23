import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ActivityPreview } from "./ActivityPreview"

import { loadActivities, fetchLastActivity } from '../store/activity.action'
import { socketService } from "../services/socket.service"
import { width } from "@mui/system"

export const ActivityList = ({ activities, selectedBoard, getInitials }) => {

    const dispatch = useDispatch()

    const { hasMore, isLoading } = useSelector(({ activityModule }) => activityModule)
    const intersectorRef = useRef()

    useEffect(() => {
        dispatch(loadActivities())
        socketService.on('board has updated', () => {
            dispatch(fetchLastActivity())
        })
        return () => {
            socketService.off('board has updated')
        }
    }, [dispatch])

    useEffect(() => {
        if (!intersectorRef.current) return
        if (!hasMore) return
        const observer = new IntersectionObserver(entries => {
            const entry = entries[0]
            if (entry.isIntersecting) dispatch(loadActivities())
        }, {
            threshold: 0.1
        })
        observer.observe(intersectorRef.current)
    }, [dispatch, hasMore])

    return (
        <>
            {activities.map(activity => (
                <ActivityPreview
                    key={activity._id}
                    activity={activity}
                    selectedBoard={selectedBoard}
                    getInitials={getInitials}
                />
            ))}
            {isLoading && <div className="spinner" ></div>}
            {hasMore && (
                <div className="intersector" ref={intersectorRef}>
                    <div></div>
                </div>
            )}
        </>
    )
}