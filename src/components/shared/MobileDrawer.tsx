/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';

import { ConfigProvider, Drawer, Select } from 'antd';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { TbChevronDown, TbWorld } from 'react-icons/tb';
import NavItems from './NavItems';
const MobileDrawer = ({ open, setOpen, items }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>>; items: any[] }) => {
      const onClose = () => {
            setOpen(!open);
      }; 

      const languageOptions = [
            { value: 'en', label: 'English', shortLabel: 'EN' },
            { value: 'bn', label: 'Bengali', shortLabel: 'BN' },
            { value: 'hi', label: 'Hindi', shortLabel: 'HI' },
            { value: 'es', label: 'Spanish', shortLabel: 'ES' },
      ];

      const customLabel = (option: any) => (
            <div className="flex items-center gap-2">
                  <span>{option.label}</span>
            </div>
      );

      return (
            <Drawer placement="right" onClose={onClose} open={open}>
                  <div className="flex flex-col  w-1/2 gap-8">
                        <NavItems items={items} onClose={onClose} />  

                        <div className='flex items-center gap-4'>
                        <Link href={'/favorite'} className='' ><Heart size={26} color='#ED6923' /></Link>
                        <Link href={`/food/1`} className=''><ShoppingCart size={26} color='#ED6923' /></Link> 

                        </div>
                        <ConfigProvider
                                                theme={{
                                                      components: {
                                                            Select: {
                                                                  optionSelectedColor: '#ffffff',
                                                                  optionSelectedBg: '#ED6923',
                                                                  optionActiveBg: '#fdf0e9',
                                                                  activeBorderColor: '#ED6923', 
                                                                  hoverBorderColor:"transparent",
                                                            },
                                                      },
                                                }}
                                          >
                                                <Select 
                                                style={{ height:"45px"}}
                                                      defaultValue="en"
                                                      options={languageOptions}
                                                      // variant={'borderless'} 
                                                      prefix={<TbWorld size={26} color='#ED6923' />}
                                                      suffixIcon={
                                                            <div className="ms-2">
                                                                  <TbChevronDown size={20} color='#ED6923' />
                                                            </div>
                                                      }
                                                      labelInValue
                                                      optionLabelProp="label"
                                                      menuItemSelectedIcon={null}
                                                      onChange={(value) => console.log(value)}
                                                      optionRender={customLabel}
                                                />
                                          </ConfigProvider>
                  </div>
            </Drawer>
      );
};

export default MobileDrawer;