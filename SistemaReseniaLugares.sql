PGDMP  .    2                }            SistemaReseniaLugares    16.3    16.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    60911    SistemaReseniaLugares    DATABASE     �   CREATE DATABASE "SistemaReseniaLugares" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
 '   DROP DATABASE "SistemaReseniaLugares";
                postgres    false            �            1259    60930    comentarios    TABLE     �  CREATE TABLE public.comentarios (
    id integer NOT NULL,
    comentario text NOT NULL,
    user_id integer,
    lugar_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    puntuacion integer,
    CONSTRAINT comentarios_puntuacion_check CHECK (((puntuacion >= 1) AND (puntuacion <= 5)))
);
    DROP TABLE public.comentarios;
       public         heap    postgres    false            �            1259    60929    comentarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comentarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.comentarios_id_seq;
       public          postgres    false    220                       0    0    comentarios_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.comentarios_id_seq OWNED BY public.comentarios.id;
          public          postgres    false    219            �            1259    60923    lugares    TABLE     �   CREATE TABLE public.lugares (
    id integer NOT NULL,
    titulo character varying(100) NOT NULL,
    imagen character varying(255) NOT NULL
);
    DROP TABLE public.lugares;
       public         heap    postgres    false            �            1259    60922    lugares_id_seq    SEQUENCE     �   CREATE SEQUENCE public.lugares_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.lugares_id_seq;
       public          postgres    false    218                       0    0    lugares_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.lugares_id_seq OWNED BY public.lugares.id;
          public          postgres    false    217            �            1259    60913    usuarios    TABLE     [  CREATE TABLE public.usuarios (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(10) DEFAULT 'user'::character varying NOT NULL,
    profile_picture character varying(255),
    estado character varying(10) DEFAULT 'activo'::character varying NOT NULL
);
    DROP TABLE public.usuarios;
       public         heap    postgres    false            �            1259    60912    usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public          postgres    false    216            	           0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public          postgres    false    215            ^           2604    60933    comentarios id    DEFAULT     p   ALTER TABLE ONLY public.comentarios ALTER COLUMN id SET DEFAULT nextval('public.comentarios_id_seq'::regclass);
 =   ALTER TABLE public.comentarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            ]           2604    60926 
   lugares id    DEFAULT     h   ALTER TABLE ONLY public.lugares ALTER COLUMN id SET DEFAULT nextval('public.lugares_id_seq'::regclass);
 9   ALTER TABLE public.lugares ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            Z           2604    60916    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216                       0    60930    comentarios 
   TABLE DATA                 public          postgres    false    220   Q       �          0    60923    lugares 
   TABLE DATA                 public          postgres    false    218   h        �          0    60913    usuarios 
   TABLE DATA                 public          postgres    false    216   �"       
           0    0    comentarios_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.comentarios_id_seq', 16, true);
          public          postgres    false    219                       0    0    lugares_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.lugares_id_seq', 6, true);
          public          postgres    false    217                       0    0    usuarios_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.usuarios_id_seq', 23, true);
          public          postgres    false    215            i           2606    60939    comentarios comentarios_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.comentarios DROP CONSTRAINT comentarios_pkey;
       public            postgres    false    220            g           2606    60928    lugares lugares_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.lugares
    ADD CONSTRAINT lugares_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.lugares DROP CONSTRAINT lugares_pkey;
       public            postgres    false    218            c           2606    60919    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            postgres    false    216            e           2606    60921    usuarios usuarios_username_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_username_key UNIQUE (username);
 H   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_username_key;
       public            postgres    false    216            j           2606    60945 %   comentarios comentarios_lugar_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_lugar_id_fkey FOREIGN KEY (lugar_id) REFERENCES public.lugares(id) ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.comentarios DROP CONSTRAINT comentarios_lugar_id_fkey;
       public          postgres    false    220    218    4711            k           2606    60940 $   comentarios comentarios_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;
 N   ALTER TABLE ONLY public.comentarios DROP CONSTRAINT comentarios_user_id_fkey;
       public          postgres    false    4707    216    220                  x���QK�0��~�{�B-�]���$sj`�����d0;iZ�ooF���U*9������?�`l��g��m��z��ʺ��{�����.(�����U�J�5�E' �����p��Is�26!N񩪼���,��3��.���>�D�<X0Ħ�]�|�C��R�Tbl�T!V>��[-���i��ҏ$?��o�����Mh9��<��&Z�T�T�*>U��$�ȝ��xK��P�Ii)S.�@�zUL���$ٮ�Y�Q���R�      �     x����o�0���W�e�pl�)�*�vHh+��V]l��2v�B���E���=T�r����}�n�����J��2ib�Ou��I�����~u����I�44P[���C��@i۶)�> w�Kg}*=��i����M6P�/e$�ҿ(�k0��������SL��|��ǦN�A�����m۩���r�̖����l�|^&����|q��l��a��	�Q�Y��b�zC��zH�St�<\<�/ϳk\������km+и�e (k��X�9Oq���m�O��b[�GoC �ר�}�Si[����pa<h	�Ց��J��2����Ux*'�o�tκ�I��䡿�n��,mr��3=��`Bٔ^����H�Ny�i�!7���K�(jk����V8?oom���(�ׅ� 
�;�8p6vRӆ�DUR����d�X���C>�ᔂx�&X�̋c�N?c��Ag�Q��A�ؾ�����S~H��Uӵ�mH�x,4���p�g��Q߭8;�)�J�      �   2  x���Mo�0 ໿��diA�vb�l�į#�N0B���7�6=���pj���iߖЩ�BC�:ޥk���LE�?s��n� �<;���]Q`��E�;_���ct��-2�+��j�E.J&�`��X��Ƿ��f~]�))��Q��)ʊW�"�~v�5?��7͸h-Ӄ��Ff��'8/P�	u�z���,���y����#�;[���ܨwtz� tt�A�U�q�� �U�y�v� ����3�R�20����-L(�ͧ��B4K��
/�+7��:���cd,��)�^�ϧ��     