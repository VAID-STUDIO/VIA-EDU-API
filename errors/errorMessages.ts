export const errorMessages = {
    401: 'Не авторизован',
    403: 'Доступ запрещен',
    404: 'Ученик не найден',
    500: 'Внутренняя ошибка сервера',
    503: 'Сервер перегружен',
    504: 'Отказано в обслуживании',
    505: 'Функция более не поддерживается',
    506: 'Данной функции не существует',
    507: 'Ваших прав недостаточно для выполнения данной команды'
};

export function logErrorDetails(method: string, userName: string, userRole: string, errorCode: number) {
    console.error(`Error occurred during ${method} method.`);
    console.error(`User: ${userName}, Role: ${userRole}`);
    console.error(`Error Code: ${errorCode}, Message: ${errorMessages[errorCode]}`);
}
