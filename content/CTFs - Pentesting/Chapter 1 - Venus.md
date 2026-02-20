# Chapter 1 - Venus

## Level 1

```bash
ssh -p 5000 hacker@venus.hackmyvm.eu
```

**Misión**
La usuaria sophia ha guardado su contraseña en un fichero oculto en esta carpeta. Encuentralo y logueate como sophia.

**Contraseña de sophia**
```bash
cat .myhiddenpazz
Y1o645M3mR84ejc
```

**Flag**
```bash
cat ...
8===skQEDuHXLkIUVlPqZqyE===D~~
```

## Level 2

```bash
ssh -p 5000 sophia@venus.hackmyvm.eu
```


**Misión**
La usuaria angela ha guardado su password en un fichero pero no recuerda donde... solo recuerda que el fichero se llamaba whereismypazz.txt

**Flag**
```bash
cat flagz.txt
8===LUzzNuv8NB59iztWUIQS===D~~
```

**Búsqueda de contraseña**
```bash
find / -name whereismypazz.txt 2>/dev/null
/usr/share/whereismypazz.txt
cat /usr/share/whereismypazz.txt
oh5p9gAABugHBje
```

## Level 3

```bash
ssh -p 5000 angela@venus.hackmyvm.eu
```

**Misión**
La password de la usuaria emma esta en la linea 4069 del fichero findme.txt

**Flag**
```bash
cat flagz.txt
8===SjMYBmMh4bk49TKq7PM8===D~~
```

**Búsqueda de contraseña**
```bash
sed -n '4069p' findme.txt
fIvltaGaq0OUH8O
```

## Level 4

```bash
ssh -p 5000 emma@venus.hackmyvm.eu
```

**Misión**
La usuaria mia ha dejado su password en el fichero "-"

**Flag**
```bash
cat flagz.txt
8===0daqdDlmd9XogkiHu4yq===D~~
```

**Búsqueda de contraseña**
```bash
cat ./-
iKXIYg0pyEH2Hos
```

## Level 5

```bash
ssh -p 5000 mia@venus.hackmyvm.eu
```

**Flag**
```bash
cat flagz.txt
8===FBMdY8hel2VMA3BaYJin===D~~
```

**Misión**
Parece que la usuaria camila ha dejado su password dentro de una carpeta llamada hereiam

**Búsqueda de contraseña**
```bash
find / -name hereiam 2>/dev/null
/opt/hereiam
cd /opt/hereiam
ls -la
.here
cat .here
F67aDmCAAgOOaOc
```

## Level 6

```bash
ssh -p 5000 camila@venus.hackmyvm.eu
```

**Flag**
```bash
cat flagz.txt
8===iDIi5sm1mDuqGmU5Psx6===D~~
```

**Misión**
La usuaria luna ha dejado su password en algun fichero dentro de la carpeta muack.

**Búsqueda de contraseña**
```bash
find . -type f
./111/111/muack
cat ./111/111/muack
j3vkuoKQwvbhkMc
```

## Level 7

```bash
ssh -p 5000 luna@venus.hackmyvm.eu
```

**Flag**
```bash
cat flagz.txt
8===KCO34FpIq3nBmHbyZvFh===D~~
```

**Misión**
La usuaria eleanor ha dejado su password en un fichero que ocupa 6969 bytes.

**Búsqueda de contraseña**
```bash
find / -type f -size 6969c 2>/dev/null
/usr/share/moon.txt
cat /usr/share/moon.txt
UNDchvln6Bmtu7b
```

## Level 8

```bash
ssh -p 5000 eleanor@venus.hackmyvm.eu
```

**Flag**
```bash
cat flagz.txt
8===Iq5vbyiQl4ipNrLDArjD===D~~
```

**Misión**
La usuaria victoria ha dejado su password en un fichero en el cual el propietario es el usuario violin.

**Búsqueda de contraseña**
```bash
find / -user violin 2>/dev/null
/usr/local/games/yo
cat /usr/local/games/yo
pz8OqvJBFxH0cSj
```


## Level 9

```bash
ssh -p 5000 victoria@venus.hackmyvm.eu
```

**Flag**
```bash
cat flagz.txt
8===NWyTFi9LLqVsZ4OnuZYN===D~~
```

**Misión**
La usuaria isla ha dejado su password en un fichero zip.

**Búsqueda de contraseña**
Al ser un archivo zip, debemos de buscar descomprimirlo, sin embargo, en la carpeta actual no tenemos permisos para escribir. Debemos de buscar alguna carpeta con permiso de escritura. Utilizamos la carpeta "tmp"
```bash
cd ../..
cd tmp
mkdir holahle
cd ..
cd pawned/victoria
unzip passw0rd.zip -d /tmp/holahle
extracting: /tmp/holahle/pwned/victoria/passw0rd.txt 
cat /tmp/holahle/pwned/victoria/passw0rd.txt 
D3XTob0FUImsoBb
```

## Level 10

```bash
ssh -p 5000 isla@venus.hackmyvm.eu
```

**Flag**
```bash
cat flagz.txt
8===ZyZqc1suvGe4QlkZHFlq===D~~
```

**Misión**
El password de la usuaria violet esta en la linea que empieza por a9HFX (sin ser estos 5 caracteres parte de su password.).

**Búsqueda de contraseña**
```bash
sed -n '/^a9HFX/p' passy 
WKINVzNQLKLDVAc
```

## Level 11

```bash
ssh -p 5000 violet@venus.hackmyvm.eu
```

**Flag**
```bash
cat flagz.txt
8===LzErk0qFPYJj16mNnnYZ===D~~
```

**Misión**
El password de la usuaria lucy se encuentra en la linea que acaba por 0JuAZ (sin ser estos ultimos 5 caracteres parte de su password)

**Búsqueda de contraseña**
```bash
sed -n '/0JuAZ/p' end
OCmMUjebG53giud
```

## Level 12

```bash
ssh -p 5000 lucy@venus.hackmyvm.eu
```

**Flag**
```bash
cat flagz.txt
8===AdCJ4wl8pmbhi770Xbd3===D~~
```

**Misión**
El password de la usuaria elena esta entre los caracteres fu y ck

**Búsqueda de contraseña**
```bash
grep -oP 'fu.*?ck' file.yo
4xZ5lIKYmfPLg9t
```

## Level 13

```bash
ssh -p 5000 elena@venus.hackmyvm.eu
```

**Flag**
```bash
cat flagz.txt
8===st1pTdqEQ0bvrJfWGwLA===D~~
```

**Misión**
La password de alice esta en una variable de entorno.


**Búsqueda de contraseña**
```bash
printenv
Cgecy2MY2MWbaqt
```

## Level 14

```bash
ssh -p 5000 alice@venus.hackmyvm.eu
```

**Flag**
```bash
cat flagz.txt
8===Qj4NNWp8LOC96S9Rtgrk===D~~
```

**Misión**
El admin ha dejado la password de anna como comentario en el fichero passwd.

**Búsqueda de contraseña**
```bash
find / -name passwd 2>/dev/null
cd /etc/passwd
w8NvY27qkpdePox
```

## Level 15

```bash
ssh -p 5000 anna@venus.hackmyvm.eu
```

**Flag**
```bash
cat flagz.txt
8===5Y3DhT66fa6Da8RpLKG0===D~~
```

**Misión**
Puede que sudo te ayude para ser natalia.

**Búsqueda de contraseña**
Para poder identificar qué cosas podemos hacer con "sudo", aplicamos `sudo -l`, esto nos permite visualizar a qué le podemos aplicar sudo sin necesidad de contraseña.
```bash
sudo -l
User anna may run the following commands on venus:
    (natalia) NOPASSWD: /bin/bash
sudo -u natalia /bin/bash
ls -la /pwned/natalia
cat /pwned/natalia/nataliapass.txt 
NMuc4DkYKDsmZ5z
```

## Level 16

```bash
ssh -p 5000 natalia@venus.hackmyvm.eu
```

**Flag**
```bash
cat flagz.txt
8===JWHa1GQq1AYrBWNXEJrH===D~~
```

**Misión**
El password de eva esta encodeado en el fichero base64.txt

**Búsqueda de contraseña**
La contraseña primeramente está codificada en base 64, debemos de decodificar.
```bash
cat base64.txt
dXBzQ0EzVUZ1MTBmREFPCg==
echo "dXBzQ0EzVUZ1MTBmREFPCg==" | base64 -d
upsCA3UFu10fDAO
```

## Level 17

```bash
ssh -p 5000 eva@venus.hackmyvm.eu
```

**Flag**
```bash
cat flagz.txt
8===22cqk3iGkGYVqnYrHiof===D~~
```

**Misión**
La password de la usuaria clara se encuentra en un fichero modificado el 01 de Mayo de 1968.

**Búsqueda de contraseña**
El Kernel UNIX no fue desarrollado hasta 1970, por lo que el sistema de archivo linux registra los archivos a partir del 1ro de enero de 1970. Hacer una búsqueda atrás de esa fecha no tendrá sentido, ya que no existen registros de ello.
```bash
find / -type f -mtime +20209 2>/dev/null
/usr/lib/cmdo
39YziWp5gSvgQN9
```

## Level 18

```bash
ssh -p 5000 clara@venus.hackmyvm.eu
```

**Flag**
```bash
cat flagz.txt
8===EJWmHDEQeEN1vIR7NYiH===D~~
```

**Misión**
La password de frida esta en el zip protegido con password.(rockyou.txt puede ayudarte)

**Búsqueda de contraseña**
```bash

```