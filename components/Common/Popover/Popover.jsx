import * as Popover from '@radix-ui/react-popover';
import * as React from 'react';

export default function PopoverPrimitive() {
    return (
        <Popover.Root>
            <Popover.Trigger>More info</Popover.Trigger>
            <Popover.Portal>
            <Popover.Content>
                Some more info…
                <Popover.Arrow />
            </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
