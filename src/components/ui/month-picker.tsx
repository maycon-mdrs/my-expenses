import {
    add,
    eachMonthOfInterval,
    endOfYear,
    format,
    isEqual,
    isFuture,
    parse,
    startOfMonth,
    startOfToday,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ptBR } from 'date-fns/locale';

function getStartOfCurrentMonth() {
    return startOfMonth(startOfToday());
}

interface MonthPickerProps {
    currentMonth: Date | null;
    onMonthChange: (newMonth: Date | any) => void;
    onClickMonth?: (bool: boolean) => void;
}

export default function MonthPicker({
    currentMonth,
    onMonthChange,
    onClickMonth,
}: MonthPickerProps) {
    const referenceDate = currentMonth || new Date();
    const [currentYear, setCurrentYear] = React.useState(
        format(referenceDate, 'yyyy', { locale: ptBR })
    );
    const firstDayCurrentYear = parse(currentYear, 'yyyy', new Date());

    const months = eachMonthOfInterval({
        start: firstDayCurrentYear,
        end: endOfYear(firstDayCurrentYear),
    });

    function previousYear() {
        let firstDayNextYear = add(firstDayCurrentYear, { years: -1 });
        setCurrentYear(format(firstDayNextYear, 'yyyy'));
    }

    function nextYear() {
        let firstDayNextYear = add(firstDayCurrentYear, { years: 1 });
        setCurrentYear(format(firstDayNextYear, 'yyyy'));
    }

    return (
        <div className="p-3">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="space-y-4">
                    <div className="relative flex items-center justify-center pt-1">
                        <div
                            className="text-sm font-medium"
                            aria-live="polite"
                            role="presentation"
                            id="month-picker"
                        >
                            {format(firstDayCurrentYear, 'yyyy', { locale: ptBR })}
                        </div>
                        <div className="flex items-center space-x-1">
                            <button
                                name="previous-year"
                                aria-label="Go to previous year"
                                className={cn(
                                    buttonVariants({ variant: 'outline' }),
                                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                                    'absolute left-1'
                                )}
                                type="button"
                                onClick={previousYear}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                                name="next-year"
                                aria-label="Go to next year"
                                className={cn(
                                    buttonVariants({ variant: 'outline' }),
                                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                                    'absolute right-1 disabled:opacity-50'
                                )}
                                type="button"
                                disabled={isFuture(add(firstDayCurrentYear, { years: 1 }))}
                                onClick={nextYear}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div
                        className="grid w-full grid-cols-3 gap-2"
                        role="grid"
                        aria-labelledby="month-picker"
                    >
                        {months.map((month) => (
                            <div
                                key={month.toString()}
                                className={cn(
                                    "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                                    "[&:has([aria-selected])]:bg-primary [&:has([aria-selected].day-outside)]:bg-primary/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                                    "dark:[&:has([aria-selected])]:bg-dark-primary"
                                )}
                                role="presentation"
                            >
                                <button
                                    name="day"
                                    className={cn(
                                        "inline-flex h-9 w-16 items-center justify-center rounded-md p-0 text-sm font-normal transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:opacity-100",
                                        "dark:hover:bg-dark-primary dark:hover:text-dark-primary-foreground dark:focus-visible:ring-dark-primary dark:focus-visible:ring-offset-2",
                                        isEqual(month, referenceDate) &&
                                        "bg-primary text-primary-foreground hover:bg-primary-dark hover:text-primary-dark-foreground dark:bg-dark-primary dark:text-dark-primary-foreground dark:hover:bg-dark-primary-dark dark:hover:text-dark-primary-dark-foreground",
                                        !isEqual(month, referenceDate) && isEqual(month, getStartOfCurrentMonth()) &&
                                        "bg-secondary text-secondary-foreground dark:bg-dark-secondary dark:text-dark-secondary-foreground"
                                    )}
                                    disabled={isFuture(month)}
                                    role="gridcell"
                                    tabIndex={-1}
                                    type="button"
                                    onClick={() => {
                                        onMonthChange(month);
                                        onClickMonth && onClickMonth(false);
                                    }}
                                >
                                    <time dateTime={format(month, 'yyyy-MM-dd')}>
                                        {format(month, 'MMM', { locale: ptBR })}
                                    </time>
                                </button>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}