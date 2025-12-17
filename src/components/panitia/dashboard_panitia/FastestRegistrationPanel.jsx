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
            <Avatar initials={team.initials} />
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

const FastestRegistrantsPanel = ({ teams }) => {
    const top5Teams = teams.slice(0, 5);

    // Warna untuk medali Top 3
    const medalColors = {
        0: 'text-amber-400', // Emas
        1: 'text-slate-400', // Perak
        2: 'text-amber-600', // Perunggu
    };

    return (
        <div className="h-fit flex flex-col">
            {/* --- Daftar Tim --- */}
            <div className="flex-1 flex flex-col min-[425px]:flex-row md:flex-col min-[425px]:gap-x-4">
                <div className="flex flex-col gap-4 w-full">
                    {top5Teams.slice(0, 3).map((team, index) => (
                        <RegistrantItem key={index} team={team} index={index} />
                    ))}
                </div>
                <div className="flex flex-col gap-4 w-full mt-4 min-[425px]:mt-0">
                    {top5Teams.slice(3, 5).map((team, index) => (
                        // index + 3 untuk menjaga urutan ranking tetap benar (4 dan 5)
                        <RegistrantItem
                            key={index + 3}
                            team={team}
                            index={index + 3}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FastestRegistrantsPanel;
