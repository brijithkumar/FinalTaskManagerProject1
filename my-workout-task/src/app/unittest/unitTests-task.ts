import { WorkOut } from "../entities/workout";
export function getAllTasks():WorkOut[]
{
    return [
        {
           id: 1, task: 'Run', parentTask:'Exercise', startDate: '30/03/2015', 
           endDate: '30/03/2016', priority: 2, endTask: true
        },
        {
            id: 2, task: 'Jump', parentTask:'Exercise', startDate: '30/07/2015', 
            endDate: '30/03/2018', priority: 10, endTask: false
         }
    ]
}
