// import React, { useState } from 'react'
// import Button from '../Button/Button'
// import { bitcoin, book, calendar, circle, clothing, comment, rupee, food, freelance, location, medical, money, piggy, stocks, takeaway, trash, tv, users } from '../../utils/icons'

// function IncomeItem({
//     id,
//     title,
//     amount,
//     date,
//     category,
//     description,
//     deleteItem,
//     indicatorColor,
//     type
// }) {

//     const [isDeleting, setIsDeleting] = useState(false);

//     const handleDelete = async (id) => {
//         setIsDeleting(true);
//         await deleteItem(id);
//         setIsDeleting(false);
//     };

//     const categoryIcon = () => {
//         switch(category) {
//             case 'salary':
//                 return money;
//             case 'freelancing':
//                 return freelance;
//             case 'investments':
//                 return stocks;
//             case 'stocks':
//                 return users;
//             case 'bitcoin':
//                 return bitcoin;
//             case 'bank':
//                 return piggy;
//             case 'other':
//                 return circle;
//             default:
//                 return circle;
//         }
//     }

//     const expenseCatIcon = () => {
//         switch (category) {
//             case 'education':
//                 return book;
//             case 'groceries':
//                 return food;
//             case 'health':
//                 return medical;
//             case 'subscriptions':
//                 return tv;
//             case 'takeaways':
//                 return takeaway;
//             case 'clothing':
//                 return clothing;
//             case 'travelling':
//                 return location;
//             case 'other':
//                 return circle;
//             default:
//                 return ''
//             }
//     } 

//     return (
//         <div className='incomeItem' indicator={indicatorColor}>
//             <div className='icon'>
//                 {type === 'expense' ? expenseCatIcon() : categoryIcon()}
//             </div>
//             <div className='content'>
//                 <h5>{title}</h5>
//                 <div className='inner-content'>
//                     <div className='text'>
//                         <p>{rupee} {amount}</p>
//                         <p>{calendar} {date}</p>
//                         <p>
//                             {comment}
//                             {description}
//                         </p>
//                     </div>
//                     <div className='btn-con'>
//                         <Button
//                             icon={trash}
//                             bPad={'1rem'}
//                             bRad={'50%'}
//                             bg={'blue'}
//                             color={'#fff'}
//                             icolor={'#fff'}
//                             hcolor={'green'}
//                             onClick={() => handleDelete(id)}
//                             disabled={isDeleting} // Disable button while deleting
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>  
//     )
// }

// export default IncomeItem;

import React, { useState } from 'react';
import Button from '../Button/Button';
import { 
    bitcoin, book, calendar, circle, clothing, comment, rupee, 
    food, freelance, location, medical, money, piggy, stocks, 
    trash, tv, users, 
    takeaways,
    debt
} from '../../utils/icons';

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}) {

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (id) => {
        setIsDeleting(true);
        await deleteItem(id);
        setIsDeleting(false);
    };

    // Combined category icon logic for both income and expense categories
    const getCategoryIcon = () => {
        const normalizedCategory = category.toLowerCase();
        const categoryIcons = {
            // Income Categories
            salary: money,
            freelancing: freelance,
            investments: users,
            stocks: stocks,
            bitcoin: bitcoin,
            bank: piggy,
            debt: debt,
            other: circle,

            // Expense Categories
            education: book,
            groceries: food,
            health: medical,
            subscriptions: tv,
            takeaways: takeaways,
            clothing: clothing,
            travelling: location
        };
        return categoryIcons[normalizedCategory] || circle;

        // // Debugging: Check what category is passed and which icon is being returned
        // console.log("Category:", category);  // Log the category prop
        // console.log("Icon:", categoryIcons[category]);  // Log the resulting icon

        // // Return the correct icon or default to `circle`
        // return categoryIcons[category] || circle; 
    };

    return (
        <div className="incomeItem" style={{ borderColor: indicatorColor }}>
            <div className="icon">
                {getCategoryIcon()} {/* Dynamically rendered category icon */}
            </div>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{rupee} {amount}</p>
                        <p>{calendar} {date}</p>
                        <p>{comment} {description}</p>
                    </div>
                    <div className="btn-con">
                        <Button
                            icon={trash}
                            bPad={'0.2rem'}
                            bRad={'50%'}
                            color="#222260" 
                            icolor={'#fff'}
                            onClick={() => handleDelete(id)}
                            disabled={isDeleting}  // Disable button during deletion
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IncomeItem;


