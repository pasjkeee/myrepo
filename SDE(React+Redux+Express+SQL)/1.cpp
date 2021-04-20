#define _CRT_SECURE_NO_WARNINGS

#include <windows.h>
#include <wincrypt.h>
#include <iostream>
#include <string>

using namespace std;

int main()
{
    setlocale(LC_ALL, "rus");

    HCRYPTPROV hProv;
    HCRYPTHASH hHash;

    BOOL result;

    TCHAR* bData = new TCHAR[8];
    bData[0] = 'r';
    bData[1] = 'y';
    bData[2] = 'b';
    bData[3] = 'k';
    bData[4] = 'i';
    bData[5] = 'n';
    bData[6] = 'p';
    bData[7] = 'v';

    //Введсти имя файла который нужно зашифровать

    char finamein[40];
    printf("Enter the name of file in: ");
    cin >> finamein;

    //Вывод зашифрованного текста

    char finameout[40];
    printf("Enter the name of file out to encrypt: ");
    cin >> finameout;

    //Вывод дешифрации зашифрованного текста
    char finameout1[40];
    printf("Enter the name of file out to decrypt encrypted: ");
    cin >> finameout1;

    cout << endl << finamein << endl << finameout << endl << finameout1 << endl << "ho" << endl;

    FILE* fin = fopen(finamein, "rb");
    fseek(fin, 0, std::ios::end);
    int size = ftell(fin);
    fseek(fin, 0, std::ios::beg);
    char* Text = (char*)malloc(size);
    FILE* fout = fopen(finameout, "wb");
    
    //Создаём провайдер
    if (!(CryptAcquireContext(&hProv, NULL, NULL, PROV_RSA_AES, 0)))
    { printf(("Ошибка подключения к\ криптопровайдеру. Код ошибки:0x%X"),
            GetLastError());}

    if (!CryptCreateHash(hProv, CALG_SHA1, NULL,
        NULL, &hHash))
    {
        printf("Ошибка создания Hash-объекта");

    }

    if (!CryptHashData(hHash, (PBYTE)bData, sizeof(bData), 0))
    {
        printf("Ошибка заполнения Hash-объекта");

    }


    BYTE* pKeyForAlg;
    HCRYPTKEY hKey;
    DWORD l = strlen(Text);
    DWORD ll = strlen(Text);

    PBYTE pBuffer;

    cout << endl << strlen(Text) << endl;

    fread(Text, size, 1, fin);
    //Генерируем ключ на основе хеша 

    if(!CryptDeriveKey( hProv, CALG_AES_192, hHash, CRYPT_EXPORTABLE | CRYPT_CREATE_SALT, &hKey )) {
        printf(("Ошибка создания ключа"),
            GetLastError());
    }

    //Этап шифрования
    //Размер изначальногоф файла и зашифрованного разный, поэтому 
    //В первый раз находим необходимую длину нового файла
    //И меняем выделенную под переменную память на новую
    //И выполняем шифровку ещё раз

    if (!CryptEncrypt(hKey, 0, true, 0, (BYTE*)Text, &l, strlen(Text))) {
        memcpy(pBuffer = (BYTE*)_alloca(l), Text, strlen(Text));
        CryptEncrypt(hKey, 0, true, 0, (BYTE*)pBuffer, &ll, l);

        //Вывод зашифрованного текста
        cout << endl << (char*)Text << endl;
        cout << endl << (char*)pBuffer << endl;

        fwrite(pBuffer, 1, l, fout);
        fclose(fin);
        fclose(fout);

        //Считываем уже зашифрованный файл

        FILE* fin1 = fopen(finameout, "rb");
        fseek(fin1, 0, std::ios::end);
        int size1 = ftell(fin1);
        fseek(fin1, 0, std::ios::beg);
        char* Text1 = (char*)malloc(size1);
        FILE* fout1 = fopen(finameout1, "wb");

        fread(Text1, size1, 1, fin1);

        //Расшифровка
        CryptDecrypt(hKey, 0, true, 0, (BYTE*)Text1, &ll);
      
        fwrite(Text1, 1, size, fout1);
        fclose(fin1);
        fclose(fout1);
    }

    system("pause");
}