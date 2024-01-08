PGDMP     (    0                 |            cementerio_db_oficial    14.4    14.4 0    %           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            &           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            '           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            (           1262    116933    cementerio_db_oficial    DATABASE     s   CREATE DATABASE cementerio_db_oficial WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Bolivia.1252';
 %   DROP DATABASE cementerio_db_oficial;
                postgres    false            �            1259    117032    Administrador    TABLE     �   CREATE TABLE public."Administrador" (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(200) NOT NULL
);
 #   DROP TABLE public."Administrador";
       public         heap    postgres    false            �            1259    117031    Administrador_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Administrador_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."Administrador_id_seq";
       public          postgres    false    218            )           0    0    Administrador_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."Administrador_id_seq" OWNED BY public."Administrador".id;
          public          postgres    false    217            �            1259    117021 	   Cremacion    TABLE     i   CREATE TABLE public."Cremacion" (
    id_servicio integer NOT NULL,
    fecha_cremacion date NOT NULL
);
    DROP TABLE public."Cremacion";
       public         heap    postgres    false            �            1259    116960    Difunto    TABLE     \  CREATE TABLE public."Difunto" (
    id_difunto integer NOT NULL,
    carnet integer NOT NULL,
    nombre character varying(255) NOT NULL,
    apellido_paterno character varying(255) NOT NULL,
    apellido_materno character varying(255),
    fecha_nacimiento date NOT NULL,
    fecha_fallecimiento date NOT NULL,
    id_doliente integer NOT NULL
);
    DROP TABLE public."Difunto";
       public         heap    postgres    false            �            1259    116935    Doliente    TABLE       CREATE TABLE public."Doliente" (
    id_doliente integer NOT NULL,
    carnet integer NOT NULL,
    nombre character varying(255) NOT NULL,
    apellido_paterno character varying(255) NOT NULL,
    apellido_materno character varying(255),
    numero_celular integer NOT NULL
);
    DROP TABLE public."Doliente";
       public         heap    postgres    false            �            1259    117009    Nicho    TABLE       CREATE TABLE public."Nicho" (
    id_servicio integer NOT NULL,
    area character varying(255) NOT NULL,
    seccion character varying(255) NOT NULL,
    fecha_entierro date NOT NULL,
    fecha_limite date,
    tipo_nicho character varying(255) NOT NULL
);
    DROP TABLE public."Nicho";
       public         heap    postgres    false            �            1259    116998    Servicio    TABLE     �   CREATE TABLE public."Servicio" (
    id_servicio integer NOT NULL,
    costo money NOT NULL,
    id_difunto integer NOT NULL
);
    DROP TABLE public."Servicio";
       public         heap    postgres    false            �            1259    116959    difunto_id_difunto_seq    SEQUENCE     �   CREATE SEQUENCE public.difunto_id_difunto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.difunto_id_difunto_seq;
       public          postgres    false    212            *           0    0    difunto_id_difunto_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.difunto_id_difunto_seq OWNED BY public."Difunto".id_difunto;
          public          postgres    false    211            �            1259    116934    doliente_id_doliente_seq    SEQUENCE     �   CREATE SEQUENCE public.doliente_id_doliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.doliente_id_doliente_seq;
       public          postgres    false    210            +           0    0    doliente_id_doliente_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.doliente_id_doliente_seq OWNED BY public."Doliente".id_doliente;
          public          postgres    false    209            �            1259    116997    servicio_id_servicio_seq    SEQUENCE     �   CREATE SEQUENCE public.servicio_id_servicio_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.servicio_id_servicio_seq;
       public          postgres    false    214            ,           0    0    servicio_id_servicio_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.servicio_id_servicio_seq OWNED BY public."Servicio".id_servicio;
          public          postgres    false    213            v           2604    117035    Administrador id    DEFAULT     x   ALTER TABLE ONLY public."Administrador" ALTER COLUMN id SET DEFAULT nextval('public."Administrador_id_seq"'::regclass);
 A   ALTER TABLE public."Administrador" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            t           2604    116963    Difunto id_difunto    DEFAULT     z   ALTER TABLE ONLY public."Difunto" ALTER COLUMN id_difunto SET DEFAULT nextval('public.difunto_id_difunto_seq'::regclass);
 C   ALTER TABLE public."Difunto" ALTER COLUMN id_difunto DROP DEFAULT;
       public          postgres    false    212    211    212            s           2604    116938    Doliente id_doliente    DEFAULT     ~   ALTER TABLE ONLY public."Doliente" ALTER COLUMN id_doliente SET DEFAULT nextval('public.doliente_id_doliente_seq'::regclass);
 E   ALTER TABLE public."Doliente" ALTER COLUMN id_doliente DROP DEFAULT;
       public          postgres    false    209    210    210            u           2604    117001    Servicio id_servicio    DEFAULT     ~   ALTER TABLE ONLY public."Servicio" ALTER COLUMN id_servicio SET DEFAULT nextval('public.servicio_id_servicio_seq'::regclass);
 E   ALTER TABLE public."Servicio" ALTER COLUMN id_servicio DROP DEFAULT;
       public          postgres    false    213    214    214            "          0    117032    Administrador 
   TABLE DATA           H   COPY public."Administrador" (id, username, email, password) FROM stdin;
    public          postgres    false    218   �8                  0    117021 	   Cremacion 
   TABLE DATA           C   COPY public."Cremacion" (id_servicio, fecha_cremacion) FROM stdin;
    public          postgres    false    216   P9                 0    116960    Difunto 
   TABLE DATA           �   COPY public."Difunto" (id_difunto, carnet, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, fecha_fallecimiento, id_doliente) FROM stdin;
    public          postgres    false    212   �9                 0    116935    Doliente 
   TABLE DATA           u   COPY public."Doliente" (id_doliente, carnet, nombre, apellido_paterno, apellido_materno, numero_celular) FROM stdin;
    public          postgres    false    210   y:                 0    117009    Nicho 
   TABLE DATA           g   COPY public."Nicho" (id_servicio, area, seccion, fecha_entierro, fecha_limite, tipo_nicho) FROM stdin;
    public          postgres    false    215   &;                 0    116998    Servicio 
   TABLE DATA           D   COPY public."Servicio" (id_servicio, costo, id_difunto) FROM stdin;
    public          postgres    false    214   �;       -           0    0    Administrador_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."Administrador_id_seq"', 2, true);
          public          postgres    false    217            .           0    0    difunto_id_difunto_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.difunto_id_difunto_seq', 13, true);
          public          postgres    false    211            /           0    0    doliente_id_doliente_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.doliente_id_doliente_seq', 7, true);
          public          postgres    false    209            0           0    0    servicio_id_servicio_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.servicio_id_servicio_seq', 61, true);
          public          postgres    false    213            �           2606    117037     Administrador Administrador_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."Administrador"
    ADD CONSTRAINT "Administrador_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."Administrador" DROP CONSTRAINT "Administrador_pkey";
       public            postgres    false    218            �           2606    117039 (   Administrador Administrador_username_key 
   CONSTRAINT     k   ALTER TABLE ONLY public."Administrador"
    ADD CONSTRAINT "Administrador_username_key" UNIQUE (username);
 V   ALTER TABLE ONLY public."Administrador" DROP CONSTRAINT "Administrador_username_key";
       public            postgres    false    218            �           2606    117025    Cremacion cremacion_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public."Cremacion"
    ADD CONSTRAINT cremacion_pkey PRIMARY KEY (id_servicio);
 D   ALTER TABLE ONLY public."Cremacion" DROP CONSTRAINT cremacion_pkey;
       public            postgres    false    216            {           2606    116967    Difunto difunto_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Difunto"
    ADD CONSTRAINT difunto_pkey PRIMARY KEY (id_difunto);
 @   ALTER TABLE ONLY public."Difunto" DROP CONSTRAINT difunto_pkey;
       public            postgres    false    212            x           2606    116942    Doliente doliente_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public."Doliente"
    ADD CONSTRAINT doliente_pkey PRIMARY KEY (id_doliente);
 B   ALTER TABLE ONLY public."Doliente" DROP CONSTRAINT doliente_pkey;
       public            postgres    false    210            �           2606    117015    Nicho nicho_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public."Nicho"
    ADD CONSTRAINT nicho_pkey PRIMARY KEY (id_servicio);
 <   ALTER TABLE ONLY public."Nicho" DROP CONSTRAINT nicho_pkey;
       public            postgres    false    215            �           2606    117003    Servicio servicio_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public."Servicio"
    ADD CONSTRAINT servicio_pkey PRIMARY KEY (id_servicio);
 B   ALTER TABLE ONLY public."Servicio" DROP CONSTRAINT servicio_pkey;
       public            postgres    false    214            |           1259    117040    idx_carnet_difunto    INDEX     J   CREATE INDEX idx_carnet_difunto ON public."Difunto" USING btree (carnet);
 &   DROP INDEX public.idx_carnet_difunto;
       public            postgres    false    212            y           1259    117041    idx_carnet_doliente    INDEX     L   CREATE INDEX idx_carnet_doliente ON public."Doliente" USING btree (carnet);
 '   DROP INDEX public.idx_carnet_doliente;
       public            postgres    false    210            }           1259    117043    idx_difunto_id_doliente    INDEX     T   CREATE INDEX idx_difunto_id_doliente ON public."Difunto" USING btree (id_doliente);
 +   DROP INDEX public.idx_difunto_id_doliente;
       public            postgres    false    212            ~           1259    117042    idx_difunto_servicio    INDEX     Q   CREATE INDEX idx_difunto_servicio ON public."Servicio" USING btree (id_difunto);
 (   DROP INDEX public.idx_difunto_servicio;
       public            postgres    false    214                       1259    117044    idx_servicio_costo    INDEX     J   CREATE INDEX idx_servicio_costo ON public."Servicio" USING btree (costo);
 &   DROP INDEX public.idx_servicio_costo;
       public            postgres    false    214            �           2606    117026 $   Cremacion cremacion_id_servicio_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Cremacion"
    ADD CONSTRAINT cremacion_id_servicio_fkey FOREIGN KEY (id_servicio) REFERENCES public."Servicio"(id_servicio);
 P   ALTER TABLE ONLY public."Cremacion" DROP CONSTRAINT cremacion_id_servicio_fkey;
       public          postgres    false    216    3201    214            �           2606    116968     Difunto difunto_id_doliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Difunto"
    ADD CONSTRAINT difunto_id_doliente_fkey FOREIGN KEY (id_doliente) REFERENCES public."Doliente"(id_doliente);
 L   ALTER TABLE ONLY public."Difunto" DROP CONSTRAINT difunto_id_doliente_fkey;
       public          postgres    false    212    3192    210            �           2606    117016    Nicho nicho_id_servicio_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Nicho"
    ADD CONSTRAINT nicho_id_servicio_fkey FOREIGN KEY (id_servicio) REFERENCES public."Servicio"(id_servicio);
 H   ALTER TABLE ONLY public."Nicho" DROP CONSTRAINT nicho_id_servicio_fkey;
       public          postgres    false    215    214    3201            �           2606    117004 !   Servicio servicio_id_difunto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Servicio"
    ADD CONSTRAINT servicio_id_difunto_fkey FOREIGN KEY (id_difunto) REFERENCES public."Difunto"(id_difunto);
 M   ALTER TABLE ONLY public."Servicio" DROP CONSTRAINT servicio_id_difunto_fkey;
       public          postgres    false    212    3195    214            "   o   x�%�1�0@�9>��ā�G���v@HD�z��b����U�q����A�K�,k"oI�R�
�� �矟����k\�o���F3�-��1�1bW�#��3�& ���#�          *   x�35�4202�54�56�2���t͹��<K�=... ©�         �   x�E�AJ1E�?w�TULwg�BFWn�G��3����)�bV��j�W�>�58�����:�˱�Oܥ�Yb�B"���h���q�~9fen����Ӂ��-y��8�V�1�5��Ԛԛ>�ퟙ������ǂaM�q�jV�c�}�g��*�bb���p��!f��Y��T����#�m�[Qg��z-�M|N���������B�V���?1�|^+R          �   x���1
�@���adw��5�MP��6Y$7��Encia�#��L�Fp�_������*UzDߣL�ik���؜�c#1=e�toG�N����˭��8�lPI�v�I�:6��?��S��Z�/��t��AO��p��67��s��i?#���B�         V   x�31�L4�NMN�<�9O������X��P���4�50�I�-�/J��25�L2ƫ�P�� ��̐3�S����)�	�
W���� T�&         �   x�]�K� D��YZ�/!۞�������E�y��!�}~T�pG.8�A;�B�(P#�[�#"Q�s�<�IN'4�z0�%�\P�������ۻt��4���B�A���5�yf��Y@�ԯy���X���\DK[��q1������l�_��u��ts�x����4/-`1'Ӹ�M#��Vs��.���>���V���:÷ �%a��     