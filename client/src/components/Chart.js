import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {Container, ToggleButton, ToggleButtonGroup} from "react-bootstrap";

function MyChart(props) {
    const [view, setView] = useState('day');

/*    const data = [
        { day: 'Пн', решено: 6 },
        { day: 'Вт', решено: 3 },
        { day: 'Ср', решено: 9 },
        { day: 'Чт', решено: 5 },
        { day: 'Пт', решено: 12 },
        { day: 'Сб', решено: 7 },
        { day: 'Вс', решено: 10 },
    ];*/

    const data = props.data;

/*    const monthData = [
        { month: 'Янв', решено: 50 },
        { month: 'Фев', решено: 75 },
        { month: 'Мар', решено: 100 },
        { month: 'Апр', решено: 90 },
        { month: 'Май', решено: 120 },
    ];*/

    const monthData = props.monthData;

    const handleDayViewClick = () => {
        setView('day');
    };

    const handleMonthViewClick = () => {
        setView('month');
    };

    const renderChart = () => {
        const axisProps = {
            stroke: 'rgba(0, 0, 0, 0.5)',
            tick: { fontSize: 14 },
        };

        if (view === 'day') {
            return (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <XAxis dataKey="day" type="category" {...axisProps} />
                        <YAxis {...axisProps} />
                        <CartesianGrid stroke="rgba(0, 0, 0, 0.2)" />
                        <Tooltip />
                        <Line type="monotone" dataKey="решено" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            );
        } else {
            return (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthData}>
                        <XAxis dataKey="month" type="category" {...axisProps} />
                        <YAxis {...axisProps} />
                        <CartesianGrid stroke="rgba(0, 0, 0, 0.2)" />
                        <Tooltip />
                        <Line type="monotone" dataKey="решено" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            );
        }
    };

    return (
        <Container>
            {renderChart()}
            <ToggleButtonGroup
                type="radio"
                name="view-options"
                defaultValue="days"
                value={view}
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <ToggleButton onClick={handleDayViewClick} disabled={view === 'day'}>По дням</ToggleButton>
                <ToggleButton onClick={handleMonthViewClick} disabled={view === 'month'}>По месяца</ToggleButton>
            </ToggleButtonGroup>
        </Container>
    );
}

export default MyChart;
