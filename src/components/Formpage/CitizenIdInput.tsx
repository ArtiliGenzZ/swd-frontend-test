import React, { useRef } from 'react'
import { Flex, Input, InputRef } from 'antd'

interface CitizenIdInputProps {
    value?: string;
    onChange?: (value: string) => void;
}


const CitizenIdInput: React.FC<CitizenIdInputProps> = ({ value = '', onChange }) => {
    const inputRefs = useRef<(InputRef | null)[]>([]);
    const segmentConfig = [
        { start: 0, end: 1, max: 1, width: 60 },     // 1st Segment
        { start: 1, end: 5, max: 4, width: 120 },    // 2nd Segment
        { start: 5, end: 10, max: 5, width: 150 },   // 3rd Segment
        { start: 10, end: 12, max: 2, width: 70 },   // 4th Segment
        { start: 12, end: 13, max: 1, width: 60 },   // 5th Segment
    ];
    const triggerChange = (nextString: string) => {
        //notifies the Parent Form (Ant Design)
        onChange?.(nextString);
    };
    const updateSegment = (newValue: string, index: number) => {
        //clean non-numbers input
        const cleanVal = newValue.replace(/\D/g, '');
        const { start, end, max } = segmentConfig[index];

        //Logic to stitch the string back together ensure can always slice, even if deleting
        const currentString = value.padEnd(13, ' ');
        const prefix = currentString.slice(0, start);
        const suffix = currentString.slice(end);

        //Update State
        const nextString = (prefix + cleanVal + suffix).trim();
        triggerChange(nextString);

        //AUTO-FOCUS NEXT LOGIC
        //If the user filled this box (length matches max), jump to next
        if (cleanVal.length >= max && index < 4) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    //Backspace Logic for CitizenId Input boxes
    const citizenIdBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            const { start, end } = segmentConfig[index];
            const currentSlice = value.slice(start, end);

            //check if the current inputbox is empty and not the first inputbox
            if (currentSlice.length === 0 && index > 0) {
                e.preventDefault();
                inputRefs.current[index - 1]?.focus({ cursor: 'end' });
            }
        }
    }


    return (
        <Flex align="center" gap={20}>
            {segmentConfig.map((segment, index) => (
                <React.Fragment key={index}>
                    <Input
                      key={index}
                      ref={(ref) => { inputRefs.current[index] = ref }}
                      style={{ width: segment.width }}
                      maxLength={segment.max}
                      value={value.slice(segment.start, segment.end)}
                      onChange={(e) => updateSegment(e.target.value, index)}
                      onKeyDown={(e) => citizenIdBackspace(e, index)}
                    />
                    {index < segmentConfig.length - 1 && <span>-</span>}
                </React.Fragment>
            ))}
        </Flex>
    )
}

export default CitizenIdInput