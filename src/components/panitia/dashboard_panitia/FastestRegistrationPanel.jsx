import { Award } from 'lucide-react';
import Avatar from '../../sidebar/Avatar';

const RegistrantItem = ({ team, index }) => {
    const medalColors = {
        0: 'text-amber-400', // Emas
        1: 'text-slate-400', // Perak
        2: 'text-amber-600', // Perunggu
    };

    return (
        <div className="flex items-center gap-3">
            {/* Medali untuk Top 3 */}
            <div className="w-6 flex justify-center">
                {index < 3 ? (
                    <Award
                        className={medalColors[index]}
                        size={24}
                        strokeWidth={2.5}
                    />
                ) : (
                    <span className="font-bold text-simbaris-neutral-400 text-lg">
                        {index + 1}
                    </span>
                )}
            </div>
            <Avatar imageUrl={team.logo} />
            <div className="flex-1 min-w-0">
                {' '}
                {/* min-w-0 diperlukan agar truncate berfungsi di dalam flexbox */}
                <p className="font-semibold text-sm text-simbaris-text truncate">
                    {team.team_name}
                </p>
                <p className="text-xs text-simbaris-neutral-500 truncate">
                    {team.school_name}
                </p>
            </div>
        </div>
    );
};

const RegistrantItemSkeleton = () => (
    <div className="flex items-center gap-3 animate-pulse">
        <div className="w-6 flex justify-center">
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0"></div>
        <div className="flex-1 min-w-0 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
    </div>
);

const FastestRegistrantsPanel = ({ teams, isLoading = false }) => {
    if (isLoading) {
        return (
            <div className="h-fit flex flex-col">
                <div className="flex-1 flex flex-col min-[425px]:flex-row md:flex-col min-[425px]:gap-x-4">
                    <div className="flex flex-col gap-4 w-full">
                        {[1, 2, 3].map((i) => (
                            <RegistrantItemSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const top3Teams = teams.slice(0, 5);

    return (
        <div className="h-fit flex flex-col">
            {/* --- Daftar Tim --- */}
            <div className="flex-1 flex flex-col min-[425px]:flex-row md:flex-col min-[425px]:gap-x-4">
                <div className="flex flex-col gap-4 w-full">
                    {top3Teams.slice(0, 3).map((team, index) => (
                        <RegistrantItem key={index} team={team} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FastestRegistrantsPanel;
